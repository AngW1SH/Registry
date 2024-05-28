package tasks

import (
	"context"
	"core/models"
	"core/repositories"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/chromedp/cdproto/network"
	"github.com/chromedp/chromedp"
)

func getResourceName(groups []string) string {
	for _, v := range groups {
		if strings.HasPrefix(v, "resource:") {
			return strings.TrimPrefix(v, "resource:")
		}
	}

	return ""
}

func getProjectURL(parsedData interface{}) string {
	for _, v := range parsedData.([]interface{}) {
		if v.(map[string]interface{})["name"] == "projectId" {
			return os.Getenv("ADMIN_URL") + "project/" + v.(map[string]interface{})["value"].(string)
		}
	}

	return ""
}

func GradeMetric(task models.Task, repo *repositories.SnapshotRepository) {
	// Try to decode the JSON serialized task parameters
	var parsed []interface{}
	err := json.Unmarshal([]byte(task.Data), &parsed)
	if err != nil {
		repo.Create(taskToSnapshot(task, "", err.Error(), nil))
		return
	}

	// Get the admin dashboard URL from the env variables
	adminUrl, err := url.Parse(os.Getenv("ADMIN_URL"))
	if err != nil {
		repo.Create(taskToSnapshot(task, "", err.Error(), nil))
		return
	}

	// Get resource name
	resourceName := getResourceName(task.Groups)

	if resourceName == "" {
		repo.Create(taskToSnapshot(task, "", "no resource name", nil))
		return
	}
	fmt.Println("Resource id: ", "performance-grade-" + resourceName)

	// Get the hostname of the admin dashboard
	hostname := strings.TrimPrefix(adminUrl.Hostname(), "www.")

	// Send a request to the admin dashboard to get the authorization cookies
	resp, err := http.PostForm(os.Getenv("ADMIN_URL") + "api/auth/login", url.Values{
        "username": {os.Getenv("ADMIN_USERNAME")},
        "password": {os.Getenv("ADMIN_PASSWORD")},
    })
	if err != nil {
		repo.Create(taskToSnapshot(task, "", err.Error(), nil))
		return
	}
	cookies := resp.Cookies()

	// Get the project URL parameter from the parsed data
	url := getProjectURL(parsed)
	if url == "" {
		repo.Create(taskToSnapshot(task, "", "no project URL", nil))
		return
	}

    ctx, cancel := chromedp.NewContext(context.Background(), chromedp.WithLogf(log.Printf))
	defer cancel()

	// Cancel after a minute, since that would probably mean
	// there's a problem with the admin dashboard
	ctx, cancel = context.WithTimeout(ctx, time.Minute)
    defer cancel()

	var res string
    err = chromedp.Run(ctx, chromedp.ActionFunc(func(ctx context.Context) error {
		// Set the authorization cookies
		for _, cookie := range cookies {
			err := network.SetCookie(cookie.Name, cookie.Value).WithHTTPOnly(true).WithDomain(hostname).Do(ctx)

			if err != nil {
				return err
			}
		}

		return nil
		// wait for the #performance-grade element to appear and get it's text content
	}), chromedp.Sleep(time.Second*3), chromedp.Navigate(url), chromedp.WaitVisible("performance-grade-" + resourceName, chromedp.ByID), chromedp.TextContent("#performance-grade-" + resourceName, &res))

	if err != nil {
		repo.Create(taskToSnapshot(task, "", err.Error(), nil))
		return
	}

	result := taskToSnapshot(task, res, "", nil)

	repo.Create(result)

	defer resp.Body.Close()
}
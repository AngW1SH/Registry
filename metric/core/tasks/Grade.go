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

func getProjectURL(parsedData interface{}) string {
	for _, v := range parsedData.([]interface{}) {
		if v.(map[string]interface{})["name"] == "projectUrl" {
			return v.(map[string]interface{})["value"].(string)
		}
	}

	return ""
}

func GradeMetric(task models.Task, repo *repositories.SnapshotRepository) {

	var parsed []interface{}

	err := json.Unmarshal([]byte(task.Data), &parsed)

	if err != nil {
		repo.Create(taskToSnapshot(task, "", err.Error(), nil))
		return
	}

	adminUrl, err := url.Parse(os.Getenv("ADMIN_URL"))

	if err != nil {
		repo.Create(taskToSnapshot(task, "", err.Error(), nil))
		return
	}

	hostname := strings.TrimPrefix(adminUrl.Hostname(), "www.")

	// TODO
	resp, err := http.PostForm(os.Getenv("ADMIN_URL") + "api/auth/login", url.Values{
        "username": {os.Getenv("ADMIN_USERNAME")},
        "password": {os.Getenv("ADMIN_PASSWORD")},
    })

	if err != nil {
		repo.Create(taskToSnapshot(task, "", err.Error(), nil))
		return
	}

	cookies := resp.Cookies()

	fmt.Println(cookies)
	fmt.Println("cookies should be above")

	url := getProjectURL(parsed)

	fmt.Println(url)

    ctx, cancel := chromedp.NewContext(context.Background(), chromedp.WithLogf(log.Printf))
	defer cancel()

	ctx, cancel = context.WithTimeout(ctx, 60*time.Second)
    defer cancel()

	var res string
    err = chromedp.Run(ctx, chromedp.ActionFunc(func(ctx context.Context) error {
		for _, cookie := range cookies {
			err := network.SetCookie(cookie.Name, cookie.Value).WithHTTPOnly(true).WithDomain(hostname).Do(ctx)

			if err != nil {
				return err
			}
		}

		return nil
	}), chromedp.Sleep(time.Second*3), chromedp.Navigate(url), chromedp.WaitReady("performance-grade", chromedp.ByID), chromedp.TextContent("#performance-grade", &res))

	if err != nil {
		repo.Create(taskToSnapshot(task, "", err.Error(), nil))
		return
	}

	result := taskToSnapshot(task, res, "", nil)

	repo.Create(result)

	defer resp.Body.Close()
}
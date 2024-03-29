package metrics

import (
	"core/models"
	"core/repositories"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"regexp"
	"strconv"
)

type Result struct {
	Name string `json:"name"`
	Value uint `json:"value"`
}

func getEndpoint(parsedData interface{}) string {
	for _, v := range parsedData.([]interface{}) {
		if v.(map[string]interface{})["label"] == "API Endpoint" {
			return v.(map[string]interface{})["value"].(string)
		}
	}

	return ""
}

func getContributors(endpoint string) []string {
	resp, err := http.Get(endpoint + "contributors")

	if err != nil {
		return nil
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	
	if err != nil {
		log.Fatalln(err)
	}

	var parsedBody []interface{}

	err = json.Unmarshal(body, &parsedBody)

	if err != nil {
		return nil
	}

	var result []string

	for _, v := range parsedBody {
		result = append(result, v.(map[string]interface{})["login"].(string))
	}

	return result
}

func getContributorCommits(endpoint string, contributor string) (uint, error) {
	resp, err := http.Get(endpoint + "commits?per_page=1&author=" + contributor)

	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return 0, errors.New("failed to fetch data")
	}

	pattern := `page=(\d+)>; rel="last"`

    // Compile the regular expression
    re := regexp.MustCompile(pattern)

    // Find the submatch in the string
    match := re.FindStringSubmatch(resp.Header.Get("Link"))

	if len(match) == 0 {
		return 0, errors.New("failed to find the submatch in the Link header")
	}

	numValue, err := strconv.Atoi(match[1])

	return uint(numValue), err
}

func TotalCommitsMetric(task models.Task, repo *repositories.SnapshotRepository) (string, error) {
	var parsed []interface{}

	err := json.Unmarshal([]byte(task.Data), &parsed)

	if err != nil {
		return "", err
	}

	endpoint := getEndpoint(parsed)

	if endpoint == "" {
		return "", errors.New("no API endpoint")
	}

	contributors := getContributors(endpoint)

	resultData := []Result{}

	for _, contributor := range contributors {
		commits, err := getContributorCommits(endpoint, contributor)

		if err != nil {
			return "", err
		}

		resultData = append(resultData, Result{
			Name: contributor,
			Value: commits,
		})
	}

	fmt.Println(resultData)

	result, error := json.Marshal(resultData)

	if error != nil {
		return "", nil
	}

	return string(result), nil
}
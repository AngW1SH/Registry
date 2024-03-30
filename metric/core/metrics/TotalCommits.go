package metrics

import (
	"core/models"
	"core/repositories"
	"encoding/json"
	"errors"
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

func getAPIKeys(parsedData interface{}) []string {
	for _, v := range parsedData.([]interface{}) {
		if v.(map[string]interface{})["label"] == "API Keys" {
			var result []string

			for _, apiKey := range v.(map[string]interface{})["value"].([]interface{}) {
				result = append(result, apiKey.(string))
			}
			return result
		}
	}

	return nil
}

func getContributors(endpoint string, apiKeys []string) []string {
	client := http.Client{}
	req, _ := http.NewRequest("GET", endpoint + "contributors", nil)
	req.Header.Set("Authorization", "Bearer " + apiKeys[0])
	resp, err := client.Do(req)

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

func getContributorCommits(endpoint string, contributor string, apiKeys []string) (uint, error) {
	client := http.Client{}
	req, _ := http.NewRequest("GET", endpoint + "commits?per_page=1&author=" + contributor, nil)
	req.Header.Set("Authorization", "Bearer " + apiKeys[0])
	resp, err := client.Do(req)

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

func TotalCommitsMetric(task models.Task, repo *repositories.SnapshotRepository) {
	var parsed []interface{}

	err := json.Unmarshal([]byte(task.Data), &parsed)

	if err != nil {
		repo.Create(&models.Snapshot{Metric: task.Metric, Data: "", Groups: task.Groups, Error: err.Error()})
		return;
	}

	endpoint := getEndpoint(parsed)

	if endpoint == "" {

		repo.Create(&models.Snapshot{Metric: task.Metric, Data: "", Groups: task.Groups, Error: "no API endpoint", IsPublic: task.IsPublic})
		return;
	}

	apiKeys := getAPIKeys(parsed)

	if len(apiKeys) == 0 {
		repo.Create(&models.Snapshot{Metric: task.Metric, Data: "", Groups: task.Groups, Error: "no API keys", IsPublic: task.IsPublic})
	}

	contributors := getContributors(endpoint, apiKeys)

	resultData := []Result{}

	for _, contributor := range contributors {
		commits, err := getContributorCommits(endpoint, contributor, apiKeys)

		if err != nil {
			repo.Create(&models.Snapshot{Metric: task.Metric, Data: "", Groups: task.Groups, Error: err.Error(), IsPublic: task.IsPublic})
			return;
		}

		resultData = append(resultData, Result{
			Name: contributor,
			Value: commits,
		})
	}

	result, error := json.Marshal(resultData)

	if error != nil {
		repo.Create(&models.Snapshot{Metric: task.Metric, Data: "", Groups: task.Groups, Error: err.Error(), IsPublic: task.IsPublic})
		return;
	}

	repo.Create(&models.Snapshot{Metric: task.Metric, Data: string(result), Groups: task.Groups, Error: "", IsPublic: task.IsPublic})
}
package tasks

import (
	"core/models"
	"core/repositories"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"time"
)


func getCommitDetailed(endpoint string, apiKeys []string) (interface{}, error) {
	client := http.Client{}
	req, _ := http.NewRequest("GET", endpoint, nil)
	req.Header.Set("Authorization", "Bearer " + apiKeys[0])
	resp, err := client.Do(req)

	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return nil, errors.New("request failed")
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	var parsedBody interface{}
	err = json.Unmarshal(body, &parsedBody)

	if err != nil {
		return nil, err
	}

	return parsedBody, nil
}

func CommitsDetailedMetric(task models.Task, repo *repositories.SnapshotRepository) {
	var parsed []interface{}

	err := json.Unmarshal([]byte(task.Data), &parsed)

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "CommitsDetailed", Data: "", Groups: task.Groups, Error: err.Error()})
		return;
	}

	endpoint := getEndpoint(parsed)

	if endpoint == "" {
		repo.Create(&models.Snapshot{Metric: "CommitsDetailed", Data: "", Groups: task.Groups, Error: "no API endpoint"})
		return;
	}

	apiKeys := getAPIKeys(parsed)

	if len(apiKeys) == 0 {
		repo.Create(&models.Snapshot{Metric: task.Metric, Data: "", Groups: task.Groups, Error: "no API keys", IsPublic: task.IsPublic})
	}

	// CommitsMetric queries all commits up until the current date,
	// so checking the latest update date will tell us when to stop querying
	// to prevent duplicating data
	var latestUpdatedData interface{}
	latestUpdated, err := repo.GetLastestUpdated("CommitsDetailed", task.Groups)

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "CommitsDetailed", Data: "", Groups: task.Groups, Error: err.Error(), IsPublic: task.IsPublic})
	}

	json.Unmarshal([]byte(latestUpdated.Data), &latestUpdatedData)

	var latestUpdateDate time.Time
	if latestUpdatedData != nil {
		latestUpdateDate, err = time.Parse("2006-01-02T15:04:05Z",latestUpdatedData.(map[string]interface{})["commit"].(map[string]interface{})["author"].(map[string]interface{})["date"].(string))
	}

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "CommitsDetailed", Data: "", Groups: task.Groups, Error: err.Error(), IsPublic: task.IsPublic})
	}

	var commits []interface{}

	page := 1
	commitsBatch := getCommitBatch(endpoint, page, apiKeys)

	out:
	for len(commitsBatch) != 0 {

		for _, commit := range commitsBatch {

			commitDate := commit.(map[string]interface{})["commit"].(map[string]interface{})["author"].(map[string]interface{})["date"].(string)
			date, err := time.Parse("2006-01-02T15:04:05Z", commitDate)

			if err != nil {
				continue;
			}

			if date.Before(latestUpdateDate) || date.Equal(latestUpdateDate) {
				break out
			}

			commitDetailed, err := getCommitDetailed(endpoint + "commits/" + commit.(map[string]interface{})["sha"].(string), apiKeys)

			if err != nil {
				break out;
			}

			commits = append(commits, commitDetailed)
		}

		page += 1
		commitsBatch = getCommitBatch(endpoint, page, apiKeys)
	}

	var result []*models.Snapshot
	
	for _, commit := range commits {

		data, err := json.Marshal(commit)

		if err != nil {
			continue
		}

		result = append(result, &models.Snapshot{
			Metric: "CommitsDetailed",
			Data: string(data),
			Groups: task.Groups,
			Params: []models.SnapshotParam{
				{
					Name: "id",
					Value: commit.(map[string]interface{})["node_id"].(string),
				},
			},
			Error: "",
			IsPublic: task.IsPublic,
		})
	}

	if len(result) != 0 {
		repo.CreateInBatches(result)
	}
}
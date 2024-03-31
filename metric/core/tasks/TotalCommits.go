package tasks

import (
	"core/models"
	"core/repositories"
	"encoding/json"
	"time"
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

func TotalCommitsMetric(task models.Task, repo *repositories.SnapshotRepository) {
	var parsed []interface{}

	err := json.Unmarshal([]byte(task.Data), &parsed)

	if err != nil {
		repo.Create(&models.Snapshot{Metric: task.Metric, Data: "", Groups: task.Groups, Error: err.Error(), IsPublic: task.IsPublic})
		return;
	}

	
	commits, err := repo.GetByGroupList("Commits", task.Groups)

	if err != nil || len(commits) == 0 {
		time.Sleep(10 * time.Second)
		commits, err = repo.GetByGroupList("Commits", task.Groups)

		if err != nil {
			repo.Create(&models.Snapshot{Metric: "TotalCommits", Data: "", Groups: task.Groups, Error: err.Error(), IsPublic: task.IsPublic})
		}
	}

	resultData := []Result{}

	contributors := make(map[string] int)

	if len(commits) == 0 {
		repo.Create(&models.Snapshot{Metric: "TotalCommits", Data: "[]", Groups: task.Groups, Error: "", IsPublic: task.IsPublic})
	}

	for _, v := range commits {

		var parsed interface{}
		err := json.Unmarshal([]byte(v.Data), &parsed)

		if err != nil {
			repo.Create(&models.Snapshot{Metric: "TotalCommits", Data: "", Groups: task.Groups, Error: err.Error(), IsPublic: task.IsPublic})
		}

		if parsed.(map[string]interface{})["commit"] == nil {
			continue
		}

		if parsed.(map[string]interface{})["commit"].(map[string]interface{})["author"] == nil {
			continue
		}

		author := parsed.(map[string]interface{})["commit"].(map[string]interface{})["author"].(map[string]interface{})["name"].(string)

		contributors[author] += 1
	}

	for k, v := range contributors {

		resultData = append(resultData, Result{Name: k, Value: uint(v)})
	}

	result, error := json.Marshal(resultData)

	if error != nil {
		repo.Create(&models.Snapshot{Metric: "TotalCommits", Data: "", Groups: task.Groups, Error: err.Error(), IsPublic: task.IsPublic})
		return;
	}

	repo.Create(&models.Snapshot{Metric: "TotalCommits", Data: string(result), Groups: task.Groups, Error: "", IsPublic: task.IsPublic})
}
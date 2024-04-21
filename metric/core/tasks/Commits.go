package tasks

import (
	"core/models"
	"core/repositories"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"strconv"
	"time"
)

func getCommitBatch(endpoint string, page int, apiKeys []string) []interface{} {
	client := http.Client{}
	req, _ := http.NewRequest("GET", endpoint + "commits?per_page=100&page=" + strconv.Itoa(page), nil)
	req.Header.Set("Authorization", "Bearer " + apiKeys[0])
	resp, err := client.Do(req)

	if err != nil {
		return nil
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return nil
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil
	}

	var parsedBody []interface{}
	err = json.Unmarshal(body, &parsedBody)

	if err != nil {
		return nil
	}

	return parsedBody
}

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

func saveCommitsDetailed(commits []interface{}, files [][]byte, task models.Task, repo *repositories.SnapshotRepository) {
	var result []*models.Snapshot
	var filesResult []*models.Snapshot
	
	for _, commit := range commits {

		data, err := json.Marshal(commit)

		if err != nil {
			continue
		}

		result = append(result, &models.Snapshot{
			Metric: "Commits",
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

	for _, data := range files {

		var file map[string]interface{}
		var err error
		json.Unmarshal(data, &file)

		if err != nil {
			continue
		}

		filesResult = append(filesResult, &models.Snapshot{
			Metric: "CommitFiles",
			Data: string(data),
			Groups: task.Groups,
			Params: []models.SnapshotParam{
				{
					Name: "id",
					Value: file["sha"].(string),
				},
				{
					Name: "commit_sha",
					Value: file["commit_sha"].(string),
				},
			},
			Error: "",
			IsPublic: false,
		})
	}

	if len(result) != 0 {
		repo.CreateInBatches(result)
	}

	if len(filesResult) != 0 {
		repo.CreateInBatches(filesResult)
	}
}

func CommitsMetric(task models.Task, repo *repositories.SnapshotRepository) {
	var parsed []interface{}

	err := json.Unmarshal([]byte(task.Data), &parsed)

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "Commits", Data: "", Groups: task.Groups, Error: err.Error()})
		return;
	}

	endpoint := getEndpoint(parsed)

	if endpoint == "" {
		repo.Create(&models.Snapshot{Metric: "Commits", Data: "", Groups: task.Groups, Error: "no API endpoint"})
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
	latestUpdated, err := repo.GetLastestUpdated("Commits", task.Groups)

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "Commits", Data: "", Groups: task.Groups, Error: err.Error(), IsPublic: task.IsPublic})
	}

	json.Unmarshal([]byte(latestUpdated.Data), &latestUpdatedData)

	var latestUpdateDate time.Time
	if latestUpdatedData != nil {
		latestUpdateDate, err = time.Parse("2006-01-02T15:04:05Z",latestUpdatedData.(map[string]interface{})["commit"].(map[string]interface{})["author"].(map[string]interface{})["date"].(string))
	}

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "Commits", Data: "", Groups: task.Groups, Error: err.Error(), IsPublic: task.IsPublic})
	}

	var commits []interface{}
	var files [][]byte

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

			commitFiles := commitDetailed.(map[string]interface{})["files"].([]interface{})

			for i, file := range commitFiles {
				file.(map[string]interface{})["commit_sha"] = commit.(map[string]interface{})["sha"]

				fileJson, err := json.Marshal(file)

				if err != nil {
					continue
				}

				files = append(files, fileJson)

				delete(commitDetailed.(map[string]interface{})["files"].([]interface{})[i].(map[string]interface{}), "blob_url")
				delete(commitDetailed.(map[string]interface{})["files"].([]interface{})[i].(map[string]interface{}), "commit_sha")
				delete(commitDetailed.(map[string]interface{})["files"].([]interface{})[i].(map[string]interface{}), "raw_url")
				delete(commitDetailed.(map[string]interface{})["files"].([]interface{})[i].(map[string]interface{}), "contents_url")
				delete(commitDetailed.(map[string]interface{})["files"].([]interface{})[i].(map[string]interface{}), "patch")
				
			}

			commits = append(commits, commitDetailed)
		}

	    saveCommitsDetailed(commits, files, task, repo)

		commits = nil
		files = nil

		page += 1
		commitsBatch = getCommitBatch(endpoint, page, apiKeys)
		
	}
}
package metrics

import (
	"core/models"
	"core/repositories"
	"encoding/json"
	"io"
	"net/http"
	"strconv"
	"time"
)

func getCommitBatch(endpoint string, page int) []interface{} {
	resp, err := http.Get(endpoint + "commits?per_page=100&page=" + strconv.Itoa(page))

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

	// CommitsMetric queries all commits up until the current date,
	// so checking the latest update date will tell us when to stop querying
	// to prevent duplicating data
	latestUpdateDate, err := repo.GetLastestUpdateDate("Commits", task.Groups)

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "Commits", Data: "", Groups: task.Groups, Error: err.Error()})
	}

	var commits []interface{}

	page := 1
	commitsBatch := getCommitBatch(endpoint, page)

	out:
	for len(commitsBatch) != 0 {

		for _, commit := range commitsBatch {

			commitDate := commit.(map[string]interface{})["commit"].(map[string]interface{})["author"].(map[string]interface{})["date"].(string)
			date, err := time.Parse("2006-01-02T15:04:05Z", commitDate)

			if err != nil {
				continue
			}

			if date.Before(latestUpdateDate) {
				break out
			}

			commits = append(commits, commit)
		}

		page += 1
		commitsBatch = getCommitBatch(endpoint, page)
	}

	var result []*models.Snapshot
	
	for _, commit := range commits {

		result = append(result, &models.Snapshot{
			Metric: "Commits",
			Data: commit.(map[string]interface{})["commit"].(map[string]interface{})["message"].(string),
			Groups: task.Groups,
			Error: "",
			IsPublic: task.IsPublic,
		})
	}

	if len(result) != 0 {
		repo.CreateInBatches(result)
	}
}
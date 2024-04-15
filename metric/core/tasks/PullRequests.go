package tasks

import (
	"core/models"
	"core/repositories"
	"encoding/json"
	"fmt"
	"regexp"
	"time"
)

func PullRequestsMetric(task models.Task, repo *repositories.SnapshotRepository) {
	var parsed []interface{}

	err := json.Unmarshal([]byte(task.Data), &parsed)

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "PullRequests", Data: "", Groups: task.Groups, Error: err.Error()})
		return;
	}

	endpoint := getEndpoint(parsed)

	if endpoint == "" {
		repo.Create(&models.Snapshot{Metric: "PullRequests", Data: "", Groups: task.Groups, Error: "no API endpoint"})
		return;
	}

	apiKeys := getAPIKeys(parsed)

	if len(apiKeys) == 0 {
		repo.Create(&models.Snapshot{Metric: task.Metric, Data: "", Groups: task.Groups, Error: "no API keys", IsPublic: task.IsPublic})
	}

	var latestUpdatedData interface{}
	latestUpdated, err := repo.GetLastestUpdated("PullRequests", task.Groups)

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "PullRequests", Data: "", Groups: task.Groups, Error: err.Error()})
	}

	json.Unmarshal([]byte(latestUpdated.Data), &latestUpdatedData)

	var latestUpdateDate time.Time
	if latestUpdatedData != nil {
		latestUpdateDate, err = time.Parse("2006-01-02T15:04:05Z",latestUpdatedData.(map[string]interface{})["commit"].(map[string]interface{})["author"].(map[string]interface{})["date"].(string))
	}

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "PullRequests", Data: "", Groups: task.Groups, Error: err.Error()})
	}

	var issues []interface{}

	page := 1
	issuesBatch := getIssueBatch(endpoint, page, apiKeys)

	out:
	for len(issuesBatch) != 0 {

		for _, issue := range issuesBatch {
			issuesDate := fmt.Sprintf("%v", issue.(map[string]interface{})["created_at"])

			date, err := time.Parse("2006-01-02T15:04:05Z", issuesDate)

			if err != nil {
				continue
			}

			// if issue["html_url"] doesn't have '/pull/', continue
			pattern := `/pull/`
			re := regexp.MustCompile(pattern)
			match := re.FindStringSubmatch(issue.(map[string]interface{})["html_url"].(string))

			if len(match) == 0 {
				continue
			}

			if date.Before(latestUpdateDate) || date.Equal(latestUpdateDate) {
				break out
			}

			issues = append(issues, issue)
		}

		page += 1
		issuesBatch = getCommitBatch(endpoint, page, apiKeys)
	}

	var result []*models.Snapshot
	
	for _, issue := range issues {

		data, err := json.Marshal(issue)

		if err != nil {
			continue
		}

		result = append(result, &models.Snapshot{
			Metric: "PullRequests",
			Data: string(data),
			Groups: task.Groups,
			Error: "",
			IsPublic: task.IsPublic,
		})
	}

	if len(result) != 0 {
		repo.CreateInBatches(result)
	}
}
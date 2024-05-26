package tasks

import (
	"core/models"
	"core/repositories"
	"encoding/json"
	"regexp"
)

// It's probably smarter to use the same function for both issues and pull requests
func PullRequestsMetric(task models.Task, repo *repositories.SnapshotRepository) {
	// Try to decode the JSON serialized task parameters
	var parsed []interface{}
	err := json.Unmarshal([]byte(task.Data), &parsed)
	if err != nil {
		repo.Create(taskToSnapshot(task, "", err.Error(), nil))
		return;
	}

	// Find all the saved pull requests in the DB
	pullRequestsDB, err := repo.GetByGroupList("PullRequests", task.Groups)
	if err != nil {
		return
	}

	// Create a map of all the pull requests from the DB to later access by node_id
	pullRequestsDBMap := mapSnapshotsByNodeIds(pullRequestsDB)

	// Find the endpoint parameter
	endpoint := getEndpoint(parsed)
	if endpoint == "" {
		repo.Create(taskToSnapshot(task, "", "no API endpoint", nil))
		return
	}

	// Find the API keys parameter
	apiKeys := getAPIKeys(parsed)
	if len(apiKeys) == 0 {
		repo.Create(taskToSnapshot(task, "", "no API keys", nil))
		return
	}
	if err != nil {
		repo.Create(taskToSnapshot(task, "", err.Error(), nil))
		return
	}

	var pullRequests []interface{}
	var outdated []uint

	// GitHub API returns a maximum of 100 pull requests per request
	page := 1
	pullRequestsBatch := getIssueBatch(endpoint, page, apiKeys)

	for len(pullRequestsBatch) != 0 {

		for _, pullRequest := range pullRequestsBatch {

			// if pullRequest["html_url"] doesn't have '/pull/', continue
			// because GitHub uses the same endpoint for both pull requests and issues
			pattern := `/pull/`
			re := regexp.MustCompile(pattern)
			match := re.FindStringSubmatch(pullRequest.(map[string]interface{})["html_url"].(string))
			if len(match) == 0 {
				continue
			}

			// Check if we already have this pull request
			pullRequestInDB, foundInDB := pullRequestsDBMap[pullRequest.(map[string]interface{})["node_id"].(string)]
			pullRequestDate := pullRequest.(map[string]interface{})["updated_at"].(string)

			if foundInDB {
				// Try to parse the pull request data from the DB
				var data interface{}
				err := json.Unmarshal([]byte(pullRequestInDB.Data), &data)
				if err != nil {
					continue
				}

				// Check if there have been any updates to the pull request
				// since the previous snapshot
				pullRequestDBDate := data.(map[string]interface{})["updated_at"].(string)

				// If there are updates, mark the pull request as outdated
				if pullRequestDate != pullRequestDBDate {
					outdated = append(outdated, pullRequestInDB.ID)
				} else {
					// If there are no updates, continue without saving the duplicate pull request
					continue;
				}
			}

			pullRequests = append(pullRequests, pullRequest)
		}

		page += 1
		pullRequestsBatch = getIssueBatch(endpoint, page, apiKeys)
	}

	var result []*models.Snapshot
	
	for _, pullRequest := range pullRequests {
		if pullRequest == nil {
			continue
		}

		data, err := json.Marshal(pullRequest)
		if err != nil {
			continue
		}

		// Save pull request id as a parameter in case we ever need to find it in the DB
		result = append(result, taskToSnapshot(task, string(data), "", []models.SnapshotParam{
			{
				Name: "id",
				Value: pullRequest.(map[string]interface{})["node_id"].(string),
			},
		}))
	}

	if len(outdated) != 0 {
		repo.OutdateByIdList(outdated)
	}

	if len(result) != 0 {
		repo.CreateInBatches(result)
	}
}
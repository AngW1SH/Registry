package metrics

import (
	"core/models"
	"core/repositories"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strconv"
	"time"
)

func getIssueBatch(endpoint string, page int, apiKeys []string) []interface{} {
	client := http.Client{}
	req, _ := http.NewRequest("GET", endpoint + "issues?state=all&per_page=100&page=" + strconv.Itoa(page), nil)
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

func IssuesMetric(task models.Task, repo *repositories.SnapshotRepository) {
	var parsed []interface{}

	err := json.Unmarshal([]byte(task.Data), &parsed)

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "Issues", Data: "", Groups: task.Groups, Error: err.Error()})
		return;
	}

	endpoint := getEndpoint(parsed)

	if endpoint == "" {
		repo.Create(&models.Snapshot{Metric: "Issues", Data: "", Groups: task.Groups, Error: "no API endpoint"})
		return;
	}

	apiKeys := getAPIKeys(parsed)

	if len(apiKeys) == 0 {
		repo.Create(&models.Snapshot{Metric: task.Metric, Data: "", Groups: task.Groups, Error: "no API keys", IsPublic: task.IsPublic})
	}

	// CommitsMetric queries all commits up until the current date,
	// so checking the latest update date will tell us when to stop querying
	// to prevent duplicating data
	latestUpdateDate, err := repo.GetLastestUpdateDate("Issues", task.Groups)

	fmt.Println(latestUpdateDate)

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "Issues", Data: "", Groups: task.Groups, Error: err.Error()})
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

			// if issue["html_url"] has '/pull/', continue
			pattern := `/pull/`
			re := regexp.MustCompile(pattern)
			match := re.FindStringSubmatch(issue.(map[string]interface{})["html_url"].(string))

			if len(match) == 1 {
				continue
			}

			if date.Before(latestUpdateDate) {
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
			Metric: "Issues",
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
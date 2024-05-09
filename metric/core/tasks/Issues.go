package tasks

import (
	"core/models"
	"core/repositories"
	"encoding/json"
	"io"
	"net/http"
	"regexp"
	"strconv"
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
		repo.Create(taskToSnapshot(task, "", err.Error(), nil))
		return;
	}

	issuesDB, err := repo.GetByGroupList("Issues", task.Groups)

	if err != nil {
		return;
	}

	issuesDBMap := mapSnapshotsByNodeIds(issuesDB)

	endpoint := getEndpoint(parsed)

	if endpoint == "" {
		repo.Create(taskToSnapshot(task, "", "no API endpoint", nil))
		return;
	}

	apiKeys := getAPIKeys(parsed)

	if len(apiKeys) == 0 {
		repo.Create(taskToSnapshot(task, "", "no API keys", nil))
		return;
	}

	if err != nil {
		repo.Create(taskToSnapshot(task, "", err.Error(), nil))
		return;
	}

	var issues []interface{}
	var outdated []uint

	page := 1
	issuesBatch := getIssueBatch(endpoint, page, apiKeys)

	for len(issuesBatch) != 0 {

		for _, issue := range issuesBatch {

			// if issue["html_url"] has '/pull/', continue
			pattern := `/pull/`
			re := regexp.MustCompile(pattern)
			match := re.FindStringSubmatch(issue.(map[string]interface{})["html_url"].(string))

			if len(match) == 1 {
				continue
			}

			issueInDB, foundInDB := issuesDBMap[issue.(map[string]interface{})["node_id"].(string)]
			issueDate := issue.(map[string]interface{})["updated_at"].(string)

			if foundInDB {
				var data interface{}

				err := json.Unmarshal([]byte(issueInDB.Data), &data)

				if err != nil {
					continue
				}

				issueDBDate := data.(map[string]interface{})["updated_at"].(string)

				if issueDate != issueDBDate {
					outdated = append(outdated, issueInDB.ID)
				} else {
					continue;
				}
			}

			issues = append(issues, issue)
		}

		page += 1
		issuesBatch = getIssueBatch(endpoint, page, apiKeys)
	}

	var result []*models.Snapshot
	
	for _, issue := range issues {

		if issue == nil {
			continue
		}

		data, err := json.Marshal(issue)

		if err != nil {
			continue
		}

		result = append(result, taskToSnapshot(task, string(data), "", []models.SnapshotParam{
			{
				Name: "id",
				Value: issue.(map[string]interface{})["node_id"].(string),
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
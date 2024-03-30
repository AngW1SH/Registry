package metrics

import (
	"core/models"
	"core/repositories"
	"encoding/json"
)


func IssueCompletenessMetric(task models.Task, repo *repositories.SnapshotRepository) {
	var parsed []interface{}

	err := json.Unmarshal([]byte(task.Data), &parsed)

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "IssueCompleteness", Data: "", Groups: task.Groups, Error: err.Error(), IsPublic: task.IsPublic})
		return;
	}

	issues, err := repo.GetByGroupList("Issues", task.Groups)

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "IssueCompleteness", Data: "", Groups: task.Groups, Error: err.Error(), IsPublic: task.IsPublic})
	}

	if len(issues) == 0 {
		repo.Create(&models.Snapshot{Metric: "IssueCompleteness", Data: "", Groups: task.Groups, IsPublic: task.IsPublic})
	}

	completed := 0
	total := len(issues)

	for _, issue := range issues {

		var parsed interface{}
		err := json.Unmarshal([]byte(issue.Data), &parsed)

		if err != nil {
			repo.Create(&models.Snapshot{Metric: "IssueCompleteness", Data: "", Groups: task.Groups, Error: err.Error(), IsPublic: task.IsPublic})
		}

		if parsed.(map[string]interface{})["state"].(string) == "closed" {
			completed += 1
		}
	}

	result, err := json.Marshal(map[string]interface{}{"completed": completed, "total": total})

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "IssueCompleteness", Data: "", Groups: task.Groups, Error: err.Error(), IsPublic: task.IsPublic})
	}

	repo.Create(&models.Snapshot{Metric: "IssueCompleteness", Data: string(result), Groups: task.Groups, IsPublic: task.IsPublic})
}
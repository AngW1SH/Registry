package metrics

import (
	"core/models"
	"core/repositories"
)

var List = map[string]func(task models.Task, repo *repositories.SnapshotRepository) (string, error){
	"TotalCommits": TotalCommitsMetric,
}
package tasks

import (
	"core/models"
	"core/repositories"
)

var List = map[string]func(task models.Task, repo *repositories.SnapshotRepository) {
	"Commits": CommitsMetric,
	"Issues": IssuesMetric,
	"Pull Requests": PullRequestsMetric,
	"Grade": GradeMetric,
}
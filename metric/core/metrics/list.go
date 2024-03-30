package metrics

import (
	"core/models"
	"core/repositories"
)

var List = map[string]func(task models.Task, repo *repositories.SnapshotRepository) {
	"TotalCommits": TotalCommitsMetric,
	"Commits": CommitsMetric,
	"Issues": IssuesMetric,
	"IssueCompleteness": IssueCompletenessMetric,
}
package tasks

import (
	"core/models"
	"core/repositories"
)

var List = map[string]func(task models.Task, repo *repositories.SnapshotRepository) {
	"Total Commits": TotalCommitsMetric,
	"Commits": CommitsMetric,
	"Issues": IssuesMetric,
	"Issue Completeness": IssueCompletenessMetric,
	"Pull Requests": PullRequestsMetric,
	"Grade": GradeMetric,
}
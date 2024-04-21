package tasks

import (
	"core/models"
	"core/repositories"
)

var List = map[string]func(task models.Task, repo *repositories.SnapshotRepository) {
	"TotalCommits": TotalCommitsMetric,
	"Commits": CommitsMetric,
	"CommitsDetailed": CommitsDetailedMetric,
	"Issues": IssuesMetric,
	"IssueCompleteness": IssueCompletenessMetric,
	"PullRequests": PullRequestsMetric,
}
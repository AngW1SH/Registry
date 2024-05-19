import { CommitsMetric } from "../../instances/Commits/types";
import { GradeMetric } from "../../instances/Grade";
import { IssueCompletenessMetric } from "../../instances/IssueCompleteness";
import { IssuesMetric } from "../../instances/Issues/types";
import { PullRequestHangTimeMetric } from "../../instances/PullRequestHangTime";
import { PullRequestsMetric } from "../../instances/PullRequests";
import { RapidPullRequestsMetric } from "../../instances/RapidPullRequests";
import { TotalCommitsMetric } from "../../instances/TotalCommits/types";

export type IMetric =
  | CommitsMetric
  | IssuesMetric
  | TotalCommitsMetric
  | IssueCompletenessMetric
  | PullRequestsMetric
  | PullRequestHangTimeMetric
  | RapidPullRequestsMetric
  | GradeMetric;

export enum MetricName {
  TotalCommits = "Total Commits",
  Commits = "Commits",
  IssueCompleteness = "Issue Completeness",
  Issues = "Issues",
  PullRequests = "Pull Requests",
  PullRequestHangTime = "Pull Request Hang Time",
  RapidPullRequests = "Rapid Pull Requests",
  Grade = "Grade",
}

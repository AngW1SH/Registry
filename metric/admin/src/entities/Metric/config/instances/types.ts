import { CodeChurnMetric } from "../../instances/CodeChurn";
import { CodeOwnershipMetric } from "../../instances/CodeOwnership";
import { CommitsMetric } from "../../instances/Commits";
import { DominantWeekDayMetric } from "../../instances/DominantWeekDay";
import { GradeMetric } from "../../instances/Grade";
import { IssueCompletenessMetric } from "../../instances/IssueCompleteness";
import { IssuesMetric } from "../../instances/Issues";
import { PullRequestHangTimeMetric } from "../../instances/PullRequestHangTime";
import { PullRequestsMetric } from "../../instances/PullRequests";
import { RapidPullRequestsMetric } from "../../instances/RapidPullRequests";
import { TotalCommitsMetric } from "../../instances/TotalCommits";

export type IMetric =
  | CommitsMetric
  | IssuesMetric
  | TotalCommitsMetric
  | IssueCompletenessMetric
  | PullRequestsMetric
  | PullRequestHangTimeMetric
  | RapidPullRequestsMetric
  | GradeMetric
  | DominantWeekDayMetric
  | CodeChurnMetric
  | CodeOwnershipMetric;

export enum MetricName {
  TotalCommits = "Total Commits",
  Commits = "Commits",
  IssueCompleteness = "Issue Completeness",
  Issues = "Issues",
  PullRequests = "Pull Requests",
  PullRequestHangTime = "Pull Request Hang Time",
  RapidPullRequests = "Rapid Pull Requests",
  Grade = "Grade",
  DominantWeekDay = "Dominant Week Day",
  CodeChurn = "Code Churn",
  CodeOwnership = "Code Ownership",
}

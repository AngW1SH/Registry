import { IMetric, MetricName } from "@/entities/Metric";
import { IssuesMetric, useFilterIssues } from "../../Issues";
import { CommitsMetric, useFilterCommits } from "../../Commits";
import { PullRequestsMetric, useFilterPullRequests } from "../../PullRequests";
import { DominantWeekDayData } from "../types";

export const useFilter = (
  dependencies: IMetric[],
  resourceId: string
): DominantWeekDayData => {
  const issues = dependencies.find((dep) => dep.name === MetricName.Issues) as
    | IssuesMetric
    | undefined;

  const commits = dependencies.find(
    (dep) => dep.name === MetricName.Commits
  ) as CommitsMetric | undefined;

  const pullRequests = dependencies.find(
    (dep) => dep.name === MetricName.PullRequests
  ) as PullRequestsMetric | undefined;

  const issuesFiltered = useFilterIssues(issues?.data || [], resourceId);
  const commitsFiltered = useFilterCommits(commits?.data || [], resourceId);
  const pullRequestsFiltered = useFilterPullRequests(
    pullRequests?.data || [],
    resourceId
  );

  return {
    issues: issuesFiltered,
    commits: commitsFiltered,
    pullRequests: pullRequestsFiltered,
  };
};

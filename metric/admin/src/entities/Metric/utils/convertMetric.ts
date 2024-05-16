import { IGenericMetric, IMetric, MetricName } from "../types";
import { convertCommits } from "../instances/Commits";
import { convertIssues } from "../instances/Issues";
import { convertPullRequests } from "../instances/PullRequests";
import { convertGrade } from "../instances/Grade";

export const convertMetric = (metric: IGenericMetric): IMetric => {
  switch (metric.name) {
    case "Commits":
      return {
        ...metric,
        name: MetricName.Commits,
        data: convertCommits(metric.data),
      };
    case "Issues":
      return {
        ...metric,
        name: MetricName.Issues,
        data: convertIssues(metric.data),
      };
    case "TotalCommits":
      return {
        ...metric,
        name: MetricName.TotalCommits,
      };
    case "IssueCompleteness":
      return {
        ...metric,
        name: MetricName.IssueCompleteness,
      };
    case "PullRequests":
      return {
        ...metric,
        name: MetricName.PullRequests,
        data: convertPullRequests(metric.data),
      };
    case "PullRequestHangTime":
      return {
        ...metric,
        name: MetricName.PullRequestHangTime,
      };
    case "RapidPullRequests":
      return {
        ...metric,
        name: MetricName.RapidPullRequests,
      };
    case "Grade":
      return {
        ...metric,
        name: MetricName.Grade,
        data: convertGrade(metric.data),
      };
    default:
      throw new Error("Unimplemented");
  }
};

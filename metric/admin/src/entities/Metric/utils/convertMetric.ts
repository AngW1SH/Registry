import { IGenericMetric, IMetric, MetricName } from "../types";
import { convertCommits } from "../instances/Commits";
import { convertIssues } from "../instances/Issues";
import { convertPullRequests } from "../instances/PullRequests";

export const convertMetric = (metric: IGenericMetric): IMetric => {
  switch (metric.name) {
    case "Commits":
      return {
        ...metric,
        name: MetricName.Commits,
        data: convertCommits(metric.data),
      };
    case "CommitsDetailed":
      return {
        ...metric,
        name: MetricName.CommitsDetailed,
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
    default:
      throw new Error("Unimplemented");
  }
};

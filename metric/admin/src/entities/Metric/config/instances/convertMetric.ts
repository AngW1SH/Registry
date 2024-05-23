import { IGenericMetric, IMetric, MetricName } from "../../types";
import { convertCommits } from "../../instances/Commits";
import { convertIssues } from "../../instances/Issues";
import { convertPullRequests } from "../../instances/PullRequests";
import { convertGrade } from "../../instances/Grade";

export const convertMetric = (metric: IGenericMetric): IMetric => {
  switch (metric.name) {
    case MetricName.Commits:
      return {
        ...metric,
        name: MetricName.Commits,
        data: convertCommits(metric.data),
      };
    case MetricName.Issues:
      return {
        ...metric,
        name: MetricName.Issues,
        data: convertIssues(metric.data),
      };
    case MetricName.TotalCommits:
      return {
        ...metric,
        name: MetricName.TotalCommits,
      };
    case MetricName.IssueCompleteness:
      return {
        ...metric,
        name: MetricName.IssueCompleteness,
      };
    case MetricName.PullRequests:
      return {
        ...metric,
        name: MetricName.PullRequests,
        data: convertPullRequests(metric.data),
      };
    case MetricName.PullRequestHangTime:
      return {
        ...metric,
        name: MetricName.PullRequestHangTime,
      };
    case MetricName.RapidPullRequests:
      return {
        ...metric,
        name: MetricName.RapidPullRequests,
      };
    case MetricName.Grade:
      return {
        ...metric,
        name: MetricName.Grade,
        data: convertGrade(metric.data),
      };
    case MetricName.DominantWeekDay:
      return {
        ...metric,
        name: MetricName.DominantWeekDay,
      };
    default:
      throw new Error("Unimplemented");
  }
};

import { IGenericMetric, IMetric, MetricName } from "../../types";
import { convertData } from "../convertData";
import { CommitsSchema } from "../../instances/Commits";
import { IssuesSchema } from "../../instances/Issues";
import { PullRequestsSchema } from "../../instances/PullRequests";
import { GradeSchema } from "../../instances/Grade";

export const convertMetric = (metric: IGenericMetric): IMetric => {
  switch (metric.name) {
    case MetricName.Commits:
      return {
        ...metric,
        name: MetricName.Commits,
        data: convertData(CommitsSchema, metric.data),
      };
    case MetricName.Issues:
      return {
        ...metric,
        name: MetricName.Issues,
        data: convertData(IssuesSchema, metric.data),
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
        data: convertData(PullRequestsSchema, metric.data),
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
        data: convertData(GradeSchema, metric.data),
      };
    case MetricName.DominantWeekDay:
      return {
        ...metric,
        name: MetricName.DominantWeekDay,
      };
    case MetricName.CodeChurn:
      return {
        ...metric,
        name: MetricName.CodeChurn,
      };
    case MetricName.CodeOwnership:
      return {
        ...metric,
        name: MetricName.CodeOwnership,
      };
    default:
      throw new Error("Unimplemented");
  }
};

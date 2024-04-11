import { IGenericMetric, MetricName } from "@/entities/Metric/types";

export interface IssueCompletenessMetric extends IGenericMetric {
  name: MetricName.IssueCompleteness;
}

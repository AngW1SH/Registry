import { IGenericMetric, MetricName } from "@/entities/Metric/types";

export interface RapidPullRequestsMetric extends IGenericMetric {
  name: MetricName.RapidPullRequests;
}

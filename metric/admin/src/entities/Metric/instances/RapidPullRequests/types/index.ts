import { IGenericMetric, MetricName } from "@/entities/Metric/types";

export interface RapidPullRequestsMetric extends IGenericMetric {
  name: MetricName.RapidPullRequests;
}

export interface RapidPullRequestItem {
  label: string;
  data: number;
  weekNum: string;
}

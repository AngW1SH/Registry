import { IGenericMetric, MetricName } from "../../../types";

export interface PullRequestHangTimeMetric extends IGenericMetric {
  name: MetricName.PullRequestHangTime;
}

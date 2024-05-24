import { IGenericMetric, MetricName } from "@/entities/Metric";

export interface CodeChurnMetric extends IGenericMetric {
  name: MetricName.CodeChurn;
}

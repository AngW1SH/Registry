import { IGenericMetric, MetricName } from "@/entities/Metric/types";

export interface DominantWeekDayMetric extends IGenericMetric {
  name: MetricName.DominantWeekDay;
}

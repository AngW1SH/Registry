import { IGenericMetric, MetricName } from "@/entities/Metric/types";
import { Commits } from "../../Commits";
import { Issues } from "../../Issues";
import { PullRequests } from "../../PullRequests";

export interface DominantWeekDayMetric extends IGenericMetric {
  name: MetricName.DominantWeekDay;
}

export interface DominantWeekDayData {
  commits: Commits;
  issues: Issues;
  pullRequests: PullRequests;
}

export interface DominantWeekDayValue {
  label: string;
  data: number;
}

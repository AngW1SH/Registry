import { z } from "zod";
import { IMetricParam } from "./params";

export interface IAbstractMetric {
  name: MetricName;
}

export interface IAbstractMetricDetailed extends IAbstractMetric {
  dependencies: MetricName[];
  snapshotBased: boolean;
}

export interface IMetric extends IAbstractMetric {
  id: string;
  resource: string;
  params: IMetricParam[];
  data: IGenericSnapshotList; // Snapshots
  isTracked: boolean | null;
}

export enum MetricName {
  TotalCommits = "TotalCommits",
  Commits = "Commits",
  IssueCompleteness = "IssueCompleteness",
  Issues = "Issues",
}

export interface IMetricData {
  resource: string;
  metric: MetricName;
  project: string;
  data: string;
  timestamp: Date;
  error: string | null;
}

export const GenericSnapshotListSchema = z.array(
  z.object({
    error: z.string().optional(),
    data: z.any(),
    timestamp: z.number().transform((x) => new Date(x)),
  })
);

export type IGenericSnapshotList = z.infer<typeof GenericSnapshotListSchema>;

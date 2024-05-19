import { z } from "zod";
import { IMetricParam } from "./params";
import type { IMetric } from "../config/instances/types";
import { MetricName } from "../config/instances/types";

export { MetricName };
export type { IMetric };

export interface IAbstractMetric {
  name: MetricName;
}

export interface IAbstractMetricDetailed extends IAbstractMetric {
  dependencies: MetricName[];
  snapshotBased: boolean;
}

export interface IGenericMetric {
  id: string;
  name: string;
  resource: string;
  params: IMetricParam[];
  data: IGenericSnapshotList; // Snapshots
  isTracked: boolean | null;
}

export interface IMetricData {
  resource: string;
  metric: MetricName;
  project: string;
  data: string;
  timestamp: number;
  error: string | null;
}

export const GenericSnapshotListSchema = z.array(
  z.object({
    error: z.string().optional(),
    data: z.any(),
    timestamp: z.number(),
  })
);

export type IGenericSnapshotList = z.infer<typeof GenericSnapshotListSchema>;

import { z } from "zod";
import { IMetricParam } from "./params";

export interface IAbstractMetric {
  id: string;
  name: MetricName;
}

export interface IMetric extends IAbstractMetric {
  resource: string;
  params: IMetricParam[];
  data: { error: string; data: string; timestamp: number }[]; // Snapshots
  isTracked: boolean | null;
}

export enum MetricName {
  CommitsPerDay = "CommitsPerDay",
}

export const GenericSnapshotListSchema = z.array(
  z.object({
    error: z.string().optional(),
    data: z.any(),
    timestamp: z.number().transform((x) => new Date(x)),
  })
);

export type IGenericSnapshotList = z.infer<typeof GenericSnapshotListSchema>;

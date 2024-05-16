import { IGenericMetric, MetricName } from "@/entities/Metric/types";
import { z } from "zod";

export interface GradeMetric extends IGenericMetric {
  name: MetricName.Grade;
  data: Grade;
}

export const GradeSchema = z.array(
  z.object({
    error: z.string().optional(),
    data: z.number(),
    timestamp: z.number(),
  })
);

export type Grade = z.infer<typeof GradeSchema>;

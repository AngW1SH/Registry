import { IGenericMetric, MetricName } from "@/entities/Metric";

export interface CodeOwnershipMetric extends IGenericMetric {
  name: MetricName.CodeOwnership;
}

export type CodeOwnershipData = {
  global: {
    lines: number;
  };
  items: {
    user: string;
    lines: number;
  }[];
  majority: {
    users: string[];
    lines: number;
  };
};

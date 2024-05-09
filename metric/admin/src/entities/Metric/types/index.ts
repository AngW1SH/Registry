import { z } from "zod";
import { IMetricParam } from "./params";
import { CommitsMetric } from "../instances/Commits/types";
import { IssuesMetric } from "../instances/Issues/types";
import { TotalCommitsMetric } from "../instances/TotalCommits/types";
import { IssueCompletenessMetric } from "../instances/IssueCompleteness";
import { PullRequestsMetric } from "../instances/PullRequests";
import { PullRequestHangTimeMetric } from "../instances/PullRequestHangTime";
import { RapidPullRequestsMetric } from "../instances/RapidPullRequests";

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

export type IMetric =
  | CommitsMetric
  | IssuesMetric
  | TotalCommitsMetric
  | IssueCompletenessMetric
  | PullRequestsMetric
  | PullRequestHangTimeMetric
  | RapidPullRequestsMetric;

export enum MetricName {
  TotalCommits = "TotalCommits",
  Commits = "Commits",
  IssueCompleteness = "IssueCompleteness",
  Issues = "Issues",
  PullRequests = "PullRequests",
  PullRequestHangTime = "PullRequestHangTime",
  RapidPullRequests = "RapidPullRequests",
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

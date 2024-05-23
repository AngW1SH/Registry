import type { RapidPullRequestsMetric } from "./types";
import RapidPullRequests from "./ui/RapidPullRequests";
import { useFilter as useFilterRapidPullRequests } from "./hooks/useFilter";

export type { RapidPullRequestsMetric };
export { RapidPullRequests, useFilterRapidPullRequests };

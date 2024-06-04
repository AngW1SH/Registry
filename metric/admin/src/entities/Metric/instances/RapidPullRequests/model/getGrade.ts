import { Duration } from "@/entities/Metric/types/params";
import { PullRequests } from "../../PullRequests";
import { durationToMilliseconds } from "@/entities/Metric/utils/durationToMilliseconds";

export const getGrade = (data: PullRequests, threshold: Duration) => {
  const found = data.filter((item) => {
    if (!item.data.closed_at) return false;

    return (
      +new Date(item.data.closed_at) - +new Date(item.data.created_at) <
      durationToMilliseconds(threshold)
    );
  });

  return (1 - found.length / data.length) * 5;
};

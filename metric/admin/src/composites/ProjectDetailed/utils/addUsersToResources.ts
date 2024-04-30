import { AppDispatch } from "@/app/store";
import { IMetric, extractUsersFromMetric } from "@/entities/Metric";
import { resourceSlice } from "@/entities/Resource";

export const addUsersToResources = (
  dispatch: AppDispatch,
  metrics: IMetric[]
) => {
  const users = new Set<string>();

  metrics.forEach((metric) => {
    if (!metric || !metric.data) return;

    const metricUsers = extractUsersFromMetric(metric);

    metricUsers.forEach((user) => {
      dispatch(
        resourceSlice.actions.addUser({
          resourceId: metric.resource,
          username: user,
        })
      );
    });
  });

  return Array.from(users);
};

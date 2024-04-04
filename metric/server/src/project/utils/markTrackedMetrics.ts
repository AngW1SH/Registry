import { ResourceDetailed } from 'src/resource/resource.entity';
import { Task } from 'src/task/task.entity';

export const markTrackedMetrics = (
  tasks: Task[],
  resources: ResourceDetailed[],
): ResourceDetailed[] => {
  return resources.map((resource) => {
    return {
      ...resource,
      metrics: resource.metrics.map((metric) => {
        return {
          ...metric,
          isTracked:
            tasks.findIndex(
              (task) =>
                task.metric === metric.name &&
                task.groups.includes('resource:' + resource.name),
            ) !== -1,
        };
      }),
    };
  });
};

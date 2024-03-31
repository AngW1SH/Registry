import { ResourceDetailed } from 'src/resource/resource.entity';
import { Task } from 'src/task/task.entity';

export const markTrackedMetrics = (
  tasks: Task[],
  resources: ResourceDetailed[],
) => {
  tasks.forEach((task) => {
    resources.forEach((resource) => {
      resource.metrics.forEach((metric) => {
        if (
          metric.name === task.metric &&
          task.groups.includes('resource:' + resource.name)
        ) {
          metric.isTracked = true;
        }
      });
    });
  });
};

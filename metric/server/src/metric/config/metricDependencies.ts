import { MetricNames } from '../metric.entity';
import { MetricDependencies } from './types';

export const metricDependencies: MetricDependencies = {
  [MetricNames.TotalCommits]: [MetricNames.Commits],
  [MetricNames.Commits]: [],
  [MetricNames.Issues]: [],
  [MetricNames.IssueCompleteness]: [MetricNames.Issues],
};

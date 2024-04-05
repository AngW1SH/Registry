import { MetricNames } from './metricNames';
import { MetricDependencies } from './types';

export const metricDependencies: MetricDependencies = {
  [MetricNames.TotalCommits]: [MetricNames.Commits],
  [MetricNames.Commits]: [],
  [MetricNames.Issues]: [],
  [MetricNames.IssueCompleteness]: [MetricNames.Issues],
};

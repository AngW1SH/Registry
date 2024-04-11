import { MetricParamType, MetricParamsConfig, UnitOfTime } from './types';

export const metricParams: MetricParamsConfig = {
  TotalCommits: [
    {
      type: MetricParamType.text,
      name: 'gradeWeight',
      value: '10',
    },
    {
      type: MetricParamType.duration,
      name: 'updateRate',
      value: {
        number: 2,
        unitOfTime: UnitOfTime.weeks,
      },
    },
  ],
  Commits: [
    {
      type: MetricParamType.duration,
      name: 'updateRate',
      value: {
        number: 2,
        unitOfTime: UnitOfTime.weeks,
      },
    },
  ],
  Issues: [
    {
      type: MetricParamType.duration,
      name: 'updateRate',
      value: {
        number: 2,
        unitOfTime: UnitOfTime.weeks,
      },
    },
  ],
  IssueCompleteness: [
    {
      type: MetricParamType.text,
      name: 'gradeWeight',
      value: '10',
    },
    {
      type: MetricParamType.duration,
      name: 'updateRate',
      value: {
        number: 2,
        unitOfTime: UnitOfTime.weeks,
      },
    },
  ],
};

export const IsMetricPublic = {
  TotalCommits: true,
  Commits: true,
  Issues: true,
  IssueCompleteness: true,
};

import { MetricParamType, MetricParamsConfig, UnitOfTime } from './types';

export const metricParams: MetricParamsConfig = {
  TotalCommits: [
    {
      type: MetricParamType.text,
      name: 'gradeWeight',
      label: 'Grade Weight',
      tooltip: 'Grade Weight',
      placeholder: 'Enter grade weight',
      value: '10',
    },
    {
      type: MetricParamType.duration,
      name: 'updateRate',
      label: 'Update Rate',
      tooltip: 'Update Rate',
      placeholder: 'Enter update rate',
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
      label: 'Update Rate',
      tooltip: 'Update Rate',
      placeholder: 'Enter update rate',
      value: {
        number: 2,
        unitOfTime: UnitOfTime.weeks,
      },
    },
  ],
};

export const IsMetricPublic = {
  TotalCommits: true,
  Commits: false,
};

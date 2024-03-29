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
      type: MetricParamType.text,
      name: 'weight',
      label: 'Computational Weight',
      tooltip: 'Computational Weight',
      placeholder: 'Enter computational weight',
      value: '5',
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
};

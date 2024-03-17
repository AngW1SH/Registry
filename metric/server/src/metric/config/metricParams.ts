import { MetricParamType, MetricParamsConfig } from './types';

export const metricParams: MetricParamsConfig = {
  CommitsPerDay: [
    {
      type: MetricParamType.text,
      name: 'gradeWeight',
      label: 'Grade Weight',
      tooltip: 'Grade Weight',
      placeholder: 'Enter grade weight',
    },
    {
      type: MetricParamType.text,
      name: 'updateRate',
      label: 'Update Rate',
      tooltip: 'Update Rate',
      placeholder: 'Enter update rate',
    },
  ],
};

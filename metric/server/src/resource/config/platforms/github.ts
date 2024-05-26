import { MetricName } from '@/src/metric/config/instances/metricNames';
import { ResourceConfig, ResourceFieldType } from '../types';
import { PlatformName } from '@/src/platform/platform.entity';

export const githubConfig: ResourceConfig = {
  name: PlatformName.GitHub,
  data: [
    {
      prop: 'apiEndpoint',
      type: ResourceFieldType.text,
      value: '',
    },
    {
      prop: 'url',
      type: ResourceFieldType.text,
      value: '',
    },
    {
      prop: 'apiKeys',
      type: ResourceFieldType.textArray,
      value: [],
    },
  ],
};

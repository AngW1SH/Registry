import { ResourceConfig, ResourceFieldType } from '../types';

export const githubConfig: ResourceConfig = {
  name: 'GitHub',
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

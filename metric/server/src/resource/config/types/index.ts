import { MetricName } from '@/src/metric/config/instances/metricNames';
import { PlatformName } from '@/src/platform/platform.entity';

export enum ResourceFieldType {
  text = 'text',
  textArray = 'textArray',
}

export interface GenericField {
  prop: string;
}

export interface ITextField extends GenericField {
  type: ResourceFieldType.text;
  value: string;
}

export interface ITextArrayField extends GenericField {
  type: ResourceFieldType.textArray;
  value: string[];
}

export type IResourceField = ITextField | ITextArrayField;

export interface ResourceConfig {
  name: PlatformName;
  data: IResourceField[];
}

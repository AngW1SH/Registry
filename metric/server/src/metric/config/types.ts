import { MetricNames } from '../metric.entity';

export interface GenericParam {
  name: string;
  label: string;
  tooltip?: string;
  placeholder: string;
}

export interface TextParam extends GenericParam {
  type: MetricParamType.text;
  value: string;
}

export interface TextArrayParam extends GenericParam {
  type: MetricParamType.textArray;
  value: string[];
}

export interface NumberParam extends GenericParam {
  type: MetricParamType.number;
  value: number;
}

export interface DateParam extends GenericParam {
  type: MetricParamType.date;
  value: Date;
}

export enum UnitOfTime {
  seconds = 'seconds',
  minutes = 'minutes',
  hours = 'hours',
  days = 'days',
  weeks = 'weeks',
  months = 'months',
  years = 'years',
}

export interface DurationParam extends GenericParam {
  type: MetricParamType.duration;
  value: {
    number: number;
    unitOfTime: UnitOfTime;
  };
}

export type MetricParam =
  | TextParam
  | TextArrayParam
  | NumberParam
  | DateParam
  | DurationParam;

export enum MetricParamType {
  text = 'text',
  textArray = 'textArray',
  number = 'number',
  date = 'date',
  duration = 'duration',
}

export type MetricParamsConfig = {
  [key in string]: MetricParam[];
};
export type MetricDependencies = {
  [key in MetricNames]: MetricNames[];
};

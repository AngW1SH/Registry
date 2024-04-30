import { MetricNames } from './metricNames';

export interface GenericParam {
  name: string;
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

export interface BooleanParam extends GenericParam {
  type: MetricParamType.boolean;
  value: boolean;
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
  | DurationParam
  | BooleanParam;

export enum MetricParamType {
  text = 'text',
  textArray = 'textArray',
  number = 'number',
  date = 'date',
  duration = 'duration',
  boolean = 'boolean',
}

export type MetricParamsConfig = {
  [key in string]: MetricParam[];
};

export interface GenericMetricConfig {
  params: MetricParam[];
  dependencies: MetricNames[];
}

export interface SnapshotBasedMetricConfig extends GenericMetricConfig {
  snapshotBased: true;
  isPublic: boolean;
}

export interface NonSnapshotBasedMetricConfig extends GenericMetricConfig {
  snapshotBased: false;
}

export type MetricConfig =
  | SnapshotBasedMetricConfig
  | NonSnapshotBasedMetricConfig;

export type MetricDependencies = {
  [key in MetricNames]: MetricNames[];
};

export type IsMetricPublic = {
  [key in MetricNames]: boolean;
};

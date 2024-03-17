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

export type MetricParamValue =
  | TextParam
  | TextArrayParam
  | NumberParam
  | DateParam;

export type MetricParam = Omit<MetricParamValue, 'value'>;

export enum MetricParamType {
  text = 'text',
  textArray = 'textArray',
  number = 'number',
  date = 'date',
}

export type MetricParamsConfig = {
  [key in string]: MetricParam[];
};

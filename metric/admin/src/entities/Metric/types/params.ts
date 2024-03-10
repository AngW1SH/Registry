export interface GenericParam {
  name: string;
  label: string;
  tooltip?: string;
  placeholder: string;
}

export interface ITextParam extends GenericParam {
  type: MetricParamType.text;
  value: string;
}

export interface ITextArrayParam extends GenericParam {
  type: MetricParamType.textArray;
  value: string[];
}

export interface INumberParam extends GenericParam {
  type: MetricParamType.number;
  value: number;
}

export interface IDateParam extends GenericParam {
  type: MetricParamType.date;
  value: Date;
}

export type IMetricParam =
  | ITextParam
  | ITextArrayParam
  | INumberParam
  | IDateParam;

export enum MetricParamType {
  text = "text",
  textArray = "textArray",
  number = "number",
  date = "date",
}

export enum ResourceFieldType {
  text = "text",
  textArray = "textArray",
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

export interface IResourceFieldData {
  label?: string;
  tooltip?: string;
  placeholder?: string;
}

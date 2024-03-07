export enum fieldType {
  text = "text",
  textArray = "textArray",
}

export interface GenericField {
  prop: string;
  label: string;
  placeholder: string;
}

export interface TextField extends GenericField {
  type: fieldType.text;
}

export interface TextArrayField extends GenericField {
  type: fieldType.textArray;
}

export type Field = TextField | TextArrayField;

export interface ResourceConfig {
  name: string;
  data: Field[];
}

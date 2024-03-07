export enum ResourceFieldType {
  text = "text",
  textArray = "textArray",
}

export interface GenericField {
  prop: string;
  label: string;
  tooltip?: string;
  placeholder: string;
}

export interface ITextField extends GenericField {
  type: ResourceFieldType.text;
}

export interface ITextArrayField extends GenericField {
  type: ResourceFieldType.textArray;
}

export type IResourceFieldValue =
  | {
      type: ResourceFieldType.text;
      value: string;
    }
  | {
      type: ResourceFieldType.textArray;
      value: string[];
    };

export type IResourceField = ITextField | ITextArrayField;

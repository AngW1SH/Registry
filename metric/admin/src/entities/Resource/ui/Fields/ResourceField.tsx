import { FC } from "react";
import {
  IResourceField,
  IResourceFieldValue,
  ResourceFieldType,
} from "../../types/fields";
import TextField from "./TextField";
import TextArrayField from "./TextArrayField";

interface ResourceFieldProps {
  field: IResourceField;
  onChange: (value: IResourceFieldValue, prop: string) => void;
  value: IResourceFieldValue;
}

const ResourceField: FC<ResourceFieldProps> = ({ field, value, onChange }) => {
  switch (field.type) {
    case ResourceFieldType.text: {
      return (
        <TextField
          {...field}
          value={value.type == field.type ? value.value : ""}
          onChange={(value) =>
            onChange({ type: field.type, value }, field.prop)
          }
        />
      );
    }
    case ResourceFieldType.textArray: {
      return (
        <TextArrayField
          {...field}
          value={value.type == field.type ? value.value : []}
          onChange={(value) =>
            onChange({ type: field.type, value }, field.prop)
          }
        />
      );
    }
  }

  return <div></div>;
};

export default ResourceField;

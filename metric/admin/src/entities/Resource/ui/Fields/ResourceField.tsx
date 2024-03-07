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
}

const ResourceField: FC<ResourceFieldProps> = ({ field, onChange }) => {
  switch (field.type) {
    case ResourceFieldType.text: {
      return (
        <TextField
          {...field}
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

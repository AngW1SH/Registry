import { FC } from "react";
import { IResourceField, ResourceFieldType } from "../../types/fields";
import TextField from "./TextField";
import TextArrayField from "./TextArrayField";

interface ResourceFieldProps {
  field: IResourceField;
  onChange: (value: IResourceField) => void;
}

const ResourceField: FC<ResourceFieldProps> = ({ field, onChange }) => {
  switch (field.type) {
    case ResourceFieldType.text: {
      return (
        <TextField
          {...field}
          value={field.value || ""}
          onChange={(value) => onChange({ ...field, value: value })}
        />
      );
    }
    case ResourceFieldType.textArray: {
      return (
        <TextArrayField
          {...field}
          value={field.value || []}
          onChange={(value) => onChange({ ...field, value: value })}
        />
      );
    }
  }

  return <div></div>;
};

export default ResourceField;

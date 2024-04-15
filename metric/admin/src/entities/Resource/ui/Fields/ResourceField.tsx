import { FC } from "react";
import { IResourceField, ResourceFieldType } from "../../types/fields";
import TextField from "./TextField";
import TextArrayField from "./TextArrayField";
import { fieldData } from "../../config/fieldData";

interface ResourceFieldProps {
  field: IResourceField;
  onChange: (value: IResourceField) => void;
}

const ResourceField: FC<ResourceFieldProps> = ({ field, onChange }) => {
  const data = fieldData[field.prop];

  switch (field.type) {
    case ResourceFieldType.text: {
      return (
        <TextField
          {...field}
          {...data}
          value={field.value || ""}
          onChange={(value) => onChange({ ...field, value: value })}
        />
      );
    }
    case ResourceFieldType.textArray: {
      return (
        <TextArrayField
          {...field}
          {...data}
          value={field.value || []}
          onChange={(value) => onChange({ ...field, value: value })}
        />
      );
    }
  }

  return <div></div>;
};

export default ResourceField;

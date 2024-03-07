import { FC } from "react";
import { IResourceField, ResourceFieldType } from "../../types/fields";
import TextField from "./TextField";
import TextArrayField from "./TextArrayField";

interface ResourceFieldProps {
  field: IResourceField;
}

const ResourceField: FC<ResourceFieldProps> = ({ field }) => {
  switch (field.type) {
    case ResourceFieldType.text: {
      return <TextField {...field} />;
    }
    case ResourceFieldType.textArray: {
      return <TextArrayField {...field} />;
    }
  }

  return <div></div>;
};

export default ResourceField;

import React, { FC } from "react";
import { MultiSelect, MultiSelectOption } from "@strapi/design-system";
import { useFormStore } from "../../entities/Form/model";

interface FormFieldSelectProps {}

const FormFieldSelect: FC<FormFieldSelectProps> = () => {
  const { displayedFields, fields, setDisplayedFields } = useFormStore();

  return (
    <MultiSelect
      label="Displayed form fields"
      required
      value={displayedFields || []}
      onChange={setDisplayedFields}
      placeholder="Select students"
    >
      {fields?.map((field) => (
        <MultiSelectOption value={field}>{field}</MultiSelectOption>
      ))}
    </MultiSelect>
  );
};

export default FormFieldSelect;

import React, { FC } from "react";
import { SingleSelect, SingleSelectOption } from "@strapi/design-system";
import { useFormStore } from "../../entities/Form/model";

interface FormSelectProps {}

const FormSelect: FC<FormSelectProps> = () => {
  const { form, options, setForm } = useFormStore();

  return (
    <SingleSelect
      value={form ? form.name : null}
      onChange={setForm}
      label="Form"
      required
      placeholder="Select a form"
    >
      {options.map((option) => (
        <SingleSelectOption value={option.name}>
          {option.name}
        </SingleSelectOption>
      ))}
    </SingleSelect>
  );
};

export default FormSelect;

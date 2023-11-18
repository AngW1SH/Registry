import React, { FC, useEffect } from "react";
import { SingleSelect, SingleSelectOption } from "@strapi/design-system";
import { useFormStore } from "../../entities/Form/model";
import { useStudentStore } from "../../entities/Student";

interface FormSelectProps {}

const FormSelect: FC<FormSelectProps> = () => {
  const { form, options, setForm } = useFormStore();

  const { clearActive, fetchByForm } = useStudentStore();

  useEffect(() => {
    if (form) {
      clearActive();
      fetchByForm(form.id);
    }
  }, [form]);

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

import React, { FC, useEffect, useMemo, useState } from "react";
import { SingleSelect, SingleSelectOption } from "@strapi/design-system";
import { IForm, fetchForms, useFormStore } from "../../entities/Form";
import { IFormTemplate } from "../../entities/Form/types";

interface FormSelectProps {}

const FormSelect: FC<FormSelectProps> = () => {
  const { form, setForm } = useFormStore();

  const [options, setOptions] = useState<IFormTemplate[]>([]);

  const initializeForms = async () => {
    const forms = await fetchForms();

    setOptions(forms);
  };

  const updateForm = (name: string) => {
    setForm(options.find((option) => option.name == name)!);
  };

  useEffect(() => {
    initializeForms();
  }, []);

  return (
    <SingleSelect
      value={form ? form.name : ""}
      onChange={updateForm}
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

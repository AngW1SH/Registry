import React, { FC, useEffect, useMemo } from "react";
import { SingleSelect, SingleSelectOption } from "@strapi/design-system";
import { useFormStore } from "../../entities/Form/model";
import { useStudentStore } from "../../entities/Student";

interface FormSelectProps {}

const FormSelect: FC<FormSelectProps> = () => {
  const {
    selectedForm,
    getSelectedForm,
    options,
    setSelectedForm,
    fetch: fetchForms,
  } = useFormStore();

  const { fetchByForm: fetchStudentsByForm } = useStudentStore();

  const form = useMemo(getSelectedForm, [selectedForm]);

  useEffect(() => {
    if (form) {
      fetchStudentsByForm(form.id);
    }
  }, [form]);

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <SingleSelect
      value={form ? form.name : null}
      onChange={setSelectedForm}
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

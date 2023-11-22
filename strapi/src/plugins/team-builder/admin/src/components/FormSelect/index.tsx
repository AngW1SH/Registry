import React, { FC, useEffect, useState } from "react";
import { SingleSelect, SingleSelectOption } from "@strapi/design-system";
import { useFormStore } from "../../entities/Form/model";
import { useStudentStore } from "../../entities/Student";
import { getFetchClient } from "@strapi/helper-plugin";
import { useDraftStore } from "../../entities/Draft";

interface FormSelectProps {}

const FormSelect: FC<FormSelectProps> = () => {
  const {
    form,
    options,
    setForm,
    setFormById,
    fetch: fetchForms,
  } = useFormStore();

  const { clearActive, fetchByForm } = useStudentStore();

  const { active: activeDraft, setActive: setActiveDraft } = useDraftStore();

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (form) {
      clearActive();
      fetchByForm(form.id);
      if (activeDraft) setActiveDraft({ ...activeDraft, form: form.id });
    }
  }, [form]);

  useEffect(() => {
    fetchForms();
  }, []);

  useEffect(() => {
    if (!hasLoaded && activeDraft) {
      if (activeDraft.form) {
        setFormById(activeDraft.form);
      }
      setHasLoaded(true);
    }
  }, [activeDraft]);

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

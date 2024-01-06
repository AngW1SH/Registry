import React, { FC, useEffect, useMemo, useState } from "react";
import { SingleSelect, SingleSelectOption } from "@strapi/design-system";
import { useFormStore } from "../../entities/Form";

interface FormSelectProps {}

const FormSelect: FC<FormSelectProps> = () => {
  const { type: form, setType: setForm } = useFormStore();

  return (
    <SingleSelect
      value={form ? form : ""}
      onChange={setForm}
      label="Form"
      required
      placeholder="Select a form"
    >
      <SingleSelectOption value={"Google"}>Google Form</SingleSelectOption>
    </SingleSelect>
  );
};

export default FormSelect;

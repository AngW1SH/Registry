import React, { FC } from "react";
import { MultiSelect, MultiSelectOption } from "@strapi/design-system";

interface FormFieldSelectProps {}

const FormFieldSelect: FC<FormFieldSelectProps> = () => {
  return (
    <MultiSelect
      label="Displayed form fields"
      required
      placeholder="Select students"
    >
      <MultiSelectOption value="apple">Apple</MultiSelectOption>
      <MultiSelectOption value="avocado">Avocado</MultiSelectOption>
      <MultiSelectOption value="banana">Banana</MultiSelectOption>
      <MultiSelectOption value="kiwi">Kiwi</MultiSelectOption>
      <MultiSelectOption value="mango">Mango</MultiSelectOption>
      <MultiSelectOption value="orange">Orange</MultiSelectOption>
      <MultiSelectOption value="strawberry">Strawberry</MultiSelectOption>
    </MultiSelect>
  );
};

export default FormFieldSelect;

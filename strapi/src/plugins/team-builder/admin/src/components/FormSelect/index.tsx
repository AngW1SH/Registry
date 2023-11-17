import React, { FC } from "react";
import { SingleSelect, SingleSelectOption } from "@strapi/design-system";

interface FormSelectProps {}

const FormSelect: FC<FormSelectProps> = () => {
  return (
    <SingleSelect label="Form" required placeholder="Select a form">
      <SingleSelectOption value="apple">Apple</SingleSelectOption>
      <SingleSelectOption value="avocado">Avocado</SingleSelectOption>
      <SingleSelectOption value="banana">Banana</SingleSelectOption>
      <SingleSelectOption value="kiwi">Kiwi</SingleSelectOption>
      <SingleSelectOption value="mango">Mango</SingleSelectOption>
      <SingleSelectOption value="orange">Orange</SingleSelectOption>
      <SingleSelectOption value="strawberry">Strawberry</SingleSelectOption>
    </SingleSelect>
  );
};

export default FormSelect;

import React, { FC } from "react";
import { MultiSelect, MultiSelectOption } from "@strapi/design-system";

interface UserSelectProps {}

const UserSelect: FC<UserSelectProps> = () => {
  return (
    <MultiSelect label="Students" required placeholder="Select students">
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

export default UserSelect;

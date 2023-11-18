import React, { FC } from "react";
import {
  ModalLayout,
  ModalHeader,
  Typography,
  ModalBody,
  ModalFooter,
  Button,
  MultiSelect,
  MultiSelectOption,
} from "@strapi/design-system";
import Marginer from "../shared/Marginer";

interface UserAddProps {}

const UserAdd: FC<UserAddProps> = () => {
  return (
    <ModalLayout labelledBy="Add to Team 1">
      <ModalHeader>
        <Typography
          fontWeight="bold"
          textColor="neutral800"
          as="h2"
          id="Add to Team 1"
        >
          Add students to "Team 1"
        </Typography>
      </ModalHeader>
      <ModalBody>
        <Marginer vertical={10} />
        <MultiSelect label="Students" required placeholder="Select students">
          <MultiSelectOption value="apple">Apple</MultiSelectOption>
          <MultiSelectOption value="avocado">Avocado</MultiSelectOption>
          <MultiSelectOption value="banana">Banana</MultiSelectOption>
          <MultiSelectOption value="kiwi">Kiwi</MultiSelectOption>
          <MultiSelectOption value="mango">Mango</MultiSelectOption>
          <MultiSelectOption value="orange">Orange</MultiSelectOption>
          <MultiSelectOption value="strawberry">Strawberry</MultiSelectOption>
        </MultiSelect>
        <Marginer vertical={30} />
      </ModalBody>
      <ModalFooter
        startActions={
          <Button variant="tertiary" size="L">
            Cancel
          </Button>
        }
        endActions={<Button size="L">Confirm</Button>}
      />
    </ModalLayout>
  );
};

export default UserAdd;

import React, { FC } from "react";
import { HalfWidthLargeScreen } from "./styles";
import {
  Flex,
  Button,
  SingleSelect,
  SingleSelectOption,
} from "@strapi/design-system";

interface AutoGenerateProps {}

const AutoGenerate: FC<AutoGenerateProps> = () => {
  return (
    <Flex alignItems="flex-end" justifyContent="space-between">
      <HalfWidthLargeScreen>
        <SingleSelect
          label="Algorithm"
          required
          placeholder="Select an algorithm"
        >
          <SingleSelectOption value="apple">Apple</SingleSelectOption>
          <SingleSelectOption value="avocado">Avocado</SingleSelectOption>
          <SingleSelectOption value="banana">Banana</SingleSelectOption>
          <SingleSelectOption value="kiwi">Kiwi</SingleSelectOption>
          <SingleSelectOption value="mango">Mango</SingleSelectOption>
          <SingleSelectOption value="orange">Orange</SingleSelectOption>
          <SingleSelectOption value="strawberry">Strawberry</SingleSelectOption>
        </SingleSelect>
      </HalfWidthLargeScreen>
      <HalfWidthLargeScreen>
        <Button fullWidth={true} variant="secondary" size="L">
          AutoGenerate
        </Button>
      </HalfWidthLargeScreen>
    </Flex>
  );
};

export default AutoGenerate;

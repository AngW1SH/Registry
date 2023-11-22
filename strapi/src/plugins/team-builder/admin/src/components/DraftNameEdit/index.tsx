import React, { FC, MouseEvent } from "react";

import {
  Field,
  Box,
  Flex,
  FieldLabel,
  FieldInput,
} from "@strapi/design-system";
import { useDraftStore } from "../../entities/Draft/model/useDraftStore";

interface DraftNameEditProps {}

const DraftNameEdit: FC<DraftNameEditProps> = () => {
  const { active, setActive } = useDraftStore();

  const onChange = (e: MouseEvent<HTMLInputElement>) => {
    if (active && e.target instanceof HTMLInputElement) {
      setActive({ ...active, name: e.target.value });
    }
  };

  return (
    <Field name="email">
      <Flex direction="column" alignItems="stretch" gap={1}>
        <FieldLabel>Draft name</FieldLabel>
        <FieldInput
          type="text"
          value={active?.name || ""}
          onChange={onChange}
        />
      </Flex>
    </Field>
  );
};

export default DraftNameEdit;

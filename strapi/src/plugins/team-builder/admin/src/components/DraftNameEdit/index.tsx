import React, { FC, MouseEvent } from "react";

import { Field, Flex, FieldLabel, FieldInput } from "@strapi/design-system";
import { useDraft } from "../../entities/Draft";

interface DraftNameEditProps {}

const DraftNameEdit: FC<DraftNameEditProps> = () => {
  const { draft, setDraft } = useDraft();

  const onChange = (e: MouseEvent<HTMLInputElement>) => {
    if (draft && e.target instanceof HTMLInputElement) {
      setDraft({ ...draft, name: e.target.value });
    }
  };

  return (
    <Field name="email">
      <Flex direction="column" alignItems="stretch" gap={1}>
        <FieldLabel>Draft name</FieldLabel>
        <FieldInput type="text" value={draft?.name || ""} onChange={onChange} />
      </Flex>
    </Field>
  );
};

export default DraftNameEdit;

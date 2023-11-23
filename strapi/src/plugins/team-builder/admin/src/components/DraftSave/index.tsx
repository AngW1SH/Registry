import React, { FC } from "react";

import { Button } from "@strapi/design-system";
import { useDraft } from "../../entities/Draft";

interface DraftSaveProps {}

const DraftSave: FC<DraftSaveProps> = () => {
  const { draft, saveDraft } = useDraft();

  const onClick = () => {
    if (draft) saveDraft();
  };

  return (
    <Button variant="secondary" onClick={onClick}>
      Save Draft
    </Button>
  );
};

export default DraftSave;

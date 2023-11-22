import React, { FC } from "react";

import { Button } from "@strapi/design-system";
import { saveDraft, useDraftStore } from "../../entities/Draft";

interface DraftSaveProps {}

const DraftSave: FC<DraftSaveProps> = () => {
  const { active } = useDraftStore();

  const onClick = () => {
    if (active)
      saveDraft({
        id: active.id,
        name: active.name,
        form: active.form || null,
        activeStudents: active.activeStudents,
      });
  };

  return (
    <Button variant="secondary" onClick={onClick}>
      Save Draft
    </Button>
  );
};

export default DraftSave;

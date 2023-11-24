import React, { FC, useState, useEffect } from "react";

import { Button } from "@strapi/design-system";
import { useDraft } from "../../entities/Draft";
import { useStudentStore } from "../../entities/Student";
import { useFormStore } from "../../entities/Form/model";
import { useDraftTeamsStore } from "../../entities/Team/model";

interface DraftSaveProps {}

const DraftSave: FC<DraftSaveProps> = () => {
  const { draft, saveDraft } = useDraft();
  const { selectedStudentIds } = useStudentStore();
  const { selectedForm } = useFormStore();
  const { teams } = useDraftTeamsStore();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const onClick = async () => {
    if (draft) {
      await saveDraft();
      setDisabled(true);
    }
  };

  useEffect(() => {
    if (hasLoaded) setDisabled(false);
  }, [selectedStudentIds, selectedForm, teams, draft]);

  useEffect(() => {
    if (draft) setHasLoaded(true);
  }, [draft]);

  return (
    <Button disabled={disabled} variant="secondary" onClick={onClick}>
      Save Draft
    </Button>
  );
};

export default DraftSave;

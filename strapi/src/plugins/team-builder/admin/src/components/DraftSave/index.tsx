import React, { FC } from "react";

import { Button } from "@strapi/design-system";
import { saveDraft, useDraftStore } from "../../entities/Draft";
import { useDraftTeamsStore } from "../../entities/Team/model";

interface DraftSaveProps {}

const DraftSave: FC<DraftSaveProps> = () => {
  const { active } = useDraftStore();
  const { teams } = useDraftTeamsStore();

  const onClick = () => {
    if (active)
      saveDraft({
        id: active.id,
        name: active.name,
        form: active.form || null,
        activeStudents: active.activeStudents,
        teams: teams.map((team) => team.students.map((student) => student.id)),
      });
  };

  return (
    <Button variant="secondary" onClick={onClick}>
      Save Draft
    </Button>
  );
};

export default DraftSave;

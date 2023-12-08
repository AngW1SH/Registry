import React from "react";
import { useFormStore } from "../../Form/model";
import { useStudentStore } from "../../Student";
import { useDraftTeamsStore } from "../../Team/model";
import { useFetchClient } from "@strapi/helper-plugin";
import { useDraftStore } from "./useDraftStore";

export const useDraft = () => {
  const { selectedForm, setSelectedForm } = useFormStore();
  const { students, getSelectedStudents, setSelectedStudents } =
    useStudentStore();
  const { teams, setTeams } = useDraftTeamsStore();
  const { draft, setDraft } = useDraftStore();

  const { get, post, put } = useFetchClient();

  const initialize = async (draftId: number | null) => {
    if (typeof draftId != "number") return;

    const response = await get("/team-builder/draft/" + draftId);

    if (response.status != 200) return;

    setSelectedForm(response.data?.form?.id || null);
    setSelectedStudents(
      response?.data?.activeStudents?.map(
        (student: { id: number }) => student.id
      ) || null
    );
    setTeams(
      response.data.teams.map((team: { users: { id: number }[] }) => ({
        students: team.users.map((user) => user.id),
      }))
    );

    setDraft({ id: response?.data?.id, name: response?.data?.name });
  };

  const saveDraft = async () => {
    if (!draft) return;
    const response = await put("/team-builder/draft/" + draft.id, {
      draft: {
        id: draft.id,
        name: draft.name,
        form: selectedForm,
        activeStudents: getSelectedStudents(),
        teams: teams.map((team) =>
          team.students
            .map((student) => students.find((mapped) => mapped.id == student))
            .filter((student) => student)
        ),
      },
    });
  };

  const generateDraft = async () => {
    const response = await post("/team-builder/generate", {
      teams: teams.map((team) => ({
        students: team.students
          .map((student) => students.find((mapped) => mapped.id == student))
          .filter((student) => student),
      })),
    });

    return response.status;
  };

  return { draft, setDraft, initialize, saveDraft, generateDraft };
};

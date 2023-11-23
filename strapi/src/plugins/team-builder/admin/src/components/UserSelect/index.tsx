import React, { FC, useEffect, useState, useMemo } from "react";
import { MultiSelect, MultiSelectOption } from "@strapi/design-system";
import { useStudentStore } from "../../entities/Student";
import { useFormStore } from "../../entities/Form/model";
import { useDraftStore } from "../../entities/Draft";
import { useDraftTeamsStore } from "../../entities/Team/model";

interface UserSelectProps {}

const UserSelect: FC<UserSelectProps> = () => {
  const {
    selectedStudentIds,
    getSelectedStudents,
    setSelectedStudents,
    students,
    fetchByForm,
  } = useStudentStore();

  const [hasLoaded, setHasLoaded] = useState();

  const { selectedForm, getSelectedForm, setFields } = useFormStore();

  const { setTeams } = useDraftTeamsStore();

  const { active: activeDraft, setActive: setActiveDraft } = useDraftStore();

  const form = useMemo(getSelectedForm, [selectedForm]);

  const selectedStudents = useMemo(getSelectedStudents, [
    selectedStudentIds,
    students,
  ]);

  useEffect(() => {
    if (form) {
      fetchByForm(form.id);
    }
  }, [form]);

  useEffect(() => {
    if (students.length && form && students[0].form.formId == form.id) {
      const fields = students[0].form.data.map((row) => row.question);
      setFields(fields);
    }

    if (!hasLoaded && form && activeDraft) {
      setSelectedStudents(activeDraft.activeStudents);

      const teams = activeDraft.teams.map((team) => ({
        students: team.map(
          (userId) => students.find((user) => user.id == userId)!
        ),
      }));

      setTeams(teams);
    }
  }, [students]);

  useEffect(() => {
    if (activeDraft)
      setActiveDraft({
        ...activeDraft,
        activeStudents: selectedStudents.map((student) => student.id),
      });
  }, [selectedStudentIds, students]);

  return (
    <MultiSelect
      value={selectedStudents.map((student) => student.name)}
      onChange={setSelectedStudents}
      label="Students"
      customizeContent={(values: string[]) =>
        values.length + " students selected"
      }
      required
      placeholder="Select students"
    >
      {students.map((student) => (
        <MultiSelectOption value={student.name}>
          {student.name}
        </MultiSelectOption>
      ))}
    </MultiSelect>
  );
};

export default UserSelect;

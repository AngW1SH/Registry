import React, { FC, useEffect, useState } from "react";
import { MultiSelect, MultiSelectOption } from "@strapi/design-system";
import { useStudentStore } from "../../entities/Student";
import { useFormStore } from "../../entities/Form/model";
import { useDraftStore } from "../../entities/Draft";

interface UserSelectProps {}

const UserSelect: FC<UserSelectProps> = () => {
  const { active, setActive, setActiveById, students, fetchByForm } =
    useStudentStore();

  const [hasLoaded, setHasLoaded] = useState();

  const { form, setFields } = useFormStore();

  const { active: activeDraft, setActive: setActiveDraft } = useDraftStore();

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
      setActiveById(activeDraft.activeStudents);
    }
  }, [students]);

  useEffect(() => {
    if (activeDraft)
      setActiveDraft({
        ...activeDraft,
        activeStudents: active.map((student) => student.id),
      });
  }, [active]);

  return (
    <MultiSelect
      value={active.map((student) => student.name)}
      onChange={setActive}
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

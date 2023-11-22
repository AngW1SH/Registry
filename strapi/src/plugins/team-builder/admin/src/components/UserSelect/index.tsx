import React, { FC, useEffect } from "react";
import { MultiSelect, MultiSelectOption } from "@strapi/design-system";
import { useStudentStore } from "../../entities/Student";
import { useFormStore } from "../../entities/Form/model";

interface UserSelectProps {}

const UserSelect: FC<UserSelectProps> = () => {
  const { active, setActive, students, fetchByForm } = useStudentStore();

  const { form, setFields } = useFormStore();

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
  }, [students]);

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

import React, { FC, useEffect, useMemo } from "react";
import { MultiSelect, MultiSelectOption } from "@strapi/design-system";
import { useStudentStore } from "../../entities/Student";
import { useFormStore } from "../../entities/Form/model";

interface UserSelectProps {}

const UserSelect: FC<UserSelectProps> = () => {
  const {
    selectedStudentIds,
    getSelectedStudents,
    setSelectedStudents,
    students,
    fetchByForm,
  } = useStudentStore();

  const { selectedForm, getSelectedForm, setFields } = useFormStore();

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
      const foundData = students.find((student) => student.form.data);
      const fields = foundData?.form.data || [];
      setFields(fields);
    }
  }, [students]);

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

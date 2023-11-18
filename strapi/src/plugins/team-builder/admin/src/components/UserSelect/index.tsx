import React, { FC } from "react";
import { MultiSelect, MultiSelectOption } from "@strapi/design-system";
import { useStudentStore } from "../../entities/Student";

interface UserSelectProps {}

const UserSelect: FC<UserSelectProps> = () => {
  const { active, setActive, students } = useStudentStore();

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

import React, { FC, useMemo, useState } from "react";
import {
  ModalLayout,
  ModalHeader,
  Typography,
  ModalBody,
  ModalFooter,
  Button,
  MultiSelect,
  MultiSelectOption,
} from "@strapi/design-system";
import Marginer from "../shared/Marginer";
import { useStudentStore } from "../../entities/Student";
import { useDraftTeamsStore } from "../../entities/Team/model";

interface UserAddProps {
  onCancel: () => void;
  onConfirm: (students: number[]) => void;
}

const UserAdd: FC<UserAddProps> = ({ onCancel, onConfirm }) => {
  const [selected, setSelected] = useState<string[] | null>(null);

  const { selectedStudentIds, getSelectedStudents } = useStudentStore();
  const { teams } = useDraftTeamsStore();

  const selectedStudents = useMemo(getSelectedStudents, [selectedStudentIds]);

  const unassigned = useMemo(() => {
    return selectedStudents.filter((student) => {
      let found = false;

      teams.forEach((team) => {
        if (team.students.find((teamStudent) => teamStudent == student.id))
          found = true;
      });

      return !found;
    });
  }, [selectedStudentIds, teams]);

  return (
    <ModalLayout labelledBy="Add to Team 1" onClose={onCancel}>
      <ModalHeader>
        <Typography
          fontWeight="bold"
          textColor="neutral800"
          as="h2"
          id="Add to Team 1"
        >
          Add students to "Team 1"
        </Typography>
      </ModalHeader>
      <ModalBody>
        <Marginer vertical={10} />
        <MultiSelect
          value={selected}
          onChange={setSelected}
          label="Students"
          required
          customizeContent={(values: string[]) =>
            values.length + " students selected"
          }
          placeholder="Select students"
        >
          {unassigned.map((student) => (
            <MultiSelectOption value={student.name}>
              {student.name}
            </MultiSelectOption>
          ))}
        </MultiSelect>
        <Marginer vertical={30} />
      </ModalBody>
      <ModalFooter
        startActions={
          <Button variant="tertiary" size="L" onClick={onCancel}>
            Cancel
          </Button>
        }
        endActions={
          <Button
            size="L"
            onClick={() =>
              onConfirm(
                selected?.map(
                  (name) =>
                    selectedStudents.find((student) => student.name == name)!.id
                ) || []
              )
            }
          >
            Confirm
          </Button>
        }
      />
    </ModalLayout>
  );
};

export default UserAdd;

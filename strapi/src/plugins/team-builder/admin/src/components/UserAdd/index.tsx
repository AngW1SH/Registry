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
import { ITeam } from "../../entities/Team";
import { IStudent, useStudentStore } from "../../entities/Student";
import { useDraftTeamsStore } from "../../entities/Team/model";
import { IStudentDetailed } from "../../entities/Student/types";

interface UserAddProps {
  onCancel: () => void;
  onConfirm: (students: IStudentDetailed[]) => void;
}

const UserAdd: FC<UserAddProps> = ({ onCancel, onConfirm }) => {
  const [selected, setSelected] = useState<string[] | null>(null);

  const { active } = useStudentStore();
  const { teams } = useDraftTeamsStore();

  const unassigned = useMemo(() => {
    return active.filter((student) => {
      let found = false;

      teams.forEach((team) => {
        if (team.students.find((teamStudent) => teamStudent.id == student.id))
          found = true;
      });

      return !found;
    });
  }, [active, teams]);

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
                  (name) => active.find((student) => student.name == name)!
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

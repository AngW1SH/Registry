import React, { FC, useMemo } from "react";

import {
  ModalLayout,
  Typography,
  ModalHeader,
  ModalBody,
  Box,
  ModalFooter,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@strapi/design-system";
import { TableAnswer, TableContainer, TableQuestion } from "./styles";
import { ITeam } from "../../entities/Team";
import FormFieldSelect from "../FormFieldSelect";
import Marginer from "../shared/Marginer";
import { useFormStore } from "../../entities/Form/model";
import { formatNameShort, useStudentStore } from "../../entities/Student";
import { IStudentDetailed } from "../../entities/Student/types";

interface TeamInspectProps {
  team: ITeam;
  onCancel: () => void;
  onDelete: () => void;
}

const TeamInspect: FC<TeamInspectProps> = ({ team, onCancel, onDelete }) => {
  const { displayedFields, fields } = useFormStore();
  const { students } = useStudentStore();

  const studentsMap = useMemo(() => {
    const map = new Map<number, IStudentDetailed>();

    students.forEach((student) => {
      map.set(student.id, student);
    });

    return map;
  }, [students]);

  const selected = displayedFields || fields || [];

  const answerWidthVW = team.students.length
    ? (70 - 16 - 2) / Math.min(team.students.length, 5)
    : 11;

  return (
    <>
      <ModalLayout labelledBy="Team 1" onClose={onCancel}>
        <ModalHeader>
          <Typography
            fontWeight="bold"
            textColor="neutral800"
            as="h2"
            id="Team 1"
          >
            Team 1
          </Typography>
        </ModalHeader>
        <ModalBody>
          <Box>
            <FormFieldSelect />
          </Box>
          <Marginer vertical={20} />
          <TableContainer>
            <Table colCount={6} rowCount={10}>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant="sigma">Вопрос</Typography>
                  </Th>
                  {team.students.map((student) => (
                    <Th>
                      <Typography variant="sigma">
                        {formatNameShort(studentsMap.get(student)?.name || "")}
                      </Typography>
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody key={selected.length}>
                {selected.map((entry, index) => (
                  <Tr key={entry}>
                    <Td>
                      <Typography textColor="neutral800">
                        <TableQuestion>{entry}</TableQuestion>
                      </Typography>
                    </Td>
                    {team.students.map((student, studentIndex) => (
                      <Td>
                        <Typography textColor="neutral800">
                          <TableAnswer
                            widthWV={answerWidthVW}
                            key={selected.length + studentIndex}
                          >
                            {studentsMap
                              .get(student)
                              ?.form.data.find((data) => data.question == entry)
                              ?.answer || ""}
                          </TableAnswer>
                        </Typography>
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter
          startActions={
            <Button variant="secondary" size="L" onClick={onDelete}>
              Delete Team
            </Button>
          }
        />
      </ModalLayout>
    </>
  );
};

export default TeamInspect;

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
import {
  FormRow,
  FormRowDefault,
  FormRowGrid,
  IStudentDetailed,
} from "../../entities/Student/types";
import { IFormQuestion } from "../../entities/Form/types";

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

  const answerWidthVW = team.students.length
    ? (70 - 16 - 2) / Math.min(team.students.length, 5)
    : 11;

  const selected =
    displayedFields ||
    fields?.reduce<string[]>(
      (allQuestions, field) =>
        field.type == "GRID"
          ? [...allQuestions, ...field.rows]
          : [...allQuestions, field.question],
      []
    ) ||
    [];

  const displayData = useMemo(() => {
    const result = [] as IFormQuestion[];

    selected.forEach((question) => {
      const foundField = fields?.find(
        (field) => field.type == "DEFAULT" && field.question == question
      );

      if (foundField) {
        result.push(foundField);
      } else {
        const foundFieldRow = fields?.find(
          (field) => field.type == "GRID" && field.rows.includes(question)
        );

        if (foundFieldRow) {
          const foundIndexInResult = result.findIndex(
            (field) => field.question == foundFieldRow?.question
          );

          if (foundIndexInResult == -1) {
            result.push({
              question: foundFieldRow.question,
              type: "GRID",
              rows: [question],
            });
          } else if (result[foundIndexInResult].type == "GRID") {
            (result[foundIndexInResult] as FormRowGrid).rows.push(question);
          }
        }
      }
    });

    return result;
  }, [selected]);

  return (
    <>
      <ModalLayout labelledBy="Inspect Team" onClose={onCancel}>
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
                {displayData.map((entry, index) => {
                  if (entry.type == "GRID") {
                    return entry.rows.map((row, rowIndex) => (
                      <Tr key={row}>
                        <Td>
                          <Typography textColor="neutral800">
                            <TableQuestion>{row}</TableQuestion>
                          </Typography>
                        </Td>
                        {team.students.map((student, studentIndex) => (
                          <Td>
                            <Typography textColor="neutral800">
                              <TableAnswer
                                widthWV={answerWidthVW}
                                key={"" + selected.length + studentIndex}
                              >
                                {(
                                  studentsMap
                                    .get(student)
                                    ?.form.data.find(
                                      (data) =>
                                        data.type == "GRID" &&
                                        data.rows.includes(row)
                                    ) as FormRowGrid | null
                                )?.answers[rowIndex] || ""}
                              </TableAnswer>
                            </Typography>
                          </Td>
                        ))}
                      </Tr>
                    ));
                  }

                  return (
                    <Tr key={entry.question}>
                      <Td>
                        <Typography textColor="neutral800">
                          <TableQuestion>{entry.question}</TableQuestion>
                        </Typography>
                      </Td>
                      {team.students.map((student, studentIndex) => (
                        <Td>
                          <Typography textColor="neutral800">
                            <TableAnswer
                              widthWV={answerWidthVW}
                              key={"" + selected.length + studentIndex}
                            >
                              {(
                                studentsMap
                                  .get(student)
                                  ?.form.data.find(
                                    (data) =>
                                      data.type == "DEFAULT" &&
                                      data.question == entry.question
                                  ) as FormRowDefault
                              )?.answer || ""}
                            </TableAnswer>
                          </Typography>
                        </Td>
                      ))}
                    </Tr>
                  );
                })}
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

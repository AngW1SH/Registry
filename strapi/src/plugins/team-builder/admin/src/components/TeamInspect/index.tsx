import React, { FC } from "react";

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

interface TeamInspectProps {
  team: ITeam;
  onCancel: () => void;
  onDelete: () => void;
}

const TeamInspect: FC<TeamInspectProps> = ({ team, onCancel, onDelete }) => {
  const data = [
    {
      question:
        "Контактная информация для оперативной обратной связи в https://vk.com/id0",
      answers: [
        "https://vk.com/id143280367",
        "https://vk.com/id143280367",
        "https://vk.com/id143280367",
        "https://vk.com/id143280367",
      ],
    },
    {
      question:
        "Если в предыдущем вопросе для Вас не было интересного направления деятельности, расскажите нам об области, в которой Вы хотите развиваться",
      answers: ["", "", "", ""],
    },
  ];

  const entry = {
    name: "ПМИ Осень 2023",
    createdAt: "2023-11-16",
    updatedAt: "2023-11-17",
  };
  const entries: Array<
    {
      id: number;
    } & typeof entry
  > = [];
  for (let i = 0; i < 4; i++) {
    entries.push({
      ...entry,
      id: i,
    });
  }

  const { displayedFields, fields } = useFormStore();
  const { students } = useStudentStore();

  const selected = displayedFields || fields || [];

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
                        {formatNameShort(student.name)}
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
                          <TableAnswer key={selected.length + studentIndex}>
                            {student.form?.data.find(
                              (data) => data.question == entry
                            )?.answer || ""}
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

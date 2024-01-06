import React, { FC, useEffect } from "react";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Box,
  Flex,
  BaseCheckbox,
  Typography,
  VisuallyHidden,
} from "@strapi/design-system";
import { Pencil } from "@strapi/icons";
import { ClickableTr } from "./styles";
import { IFormQuestionDefault, useFormStore } from "../../entities/Form";

interface ResultsListProps {}

const ResultsList: FC<ResultsListProps> = () => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;

  const { results, selected } = useFormStore();

  const formattedResults = results
    .filter((result, index) => selected.includes(index))
    .map((result) => {
      const nameFind = result.find(
        (row) => row.question == "Фамилия Имя Отчество"
      );
      const emailFind = result.find(
        (row) => row.question == "Электронная почта, указанная при авторизации"
      );
      const dateFind = result.find((row) => (row.question = "Timestamp"));

      return {
        name: nameFind && nameFind.type == "DEFAULT" ? nameFind.answer : "",
        email: emailFind && emailFind.type == "DEFAULT" ? emailFind.answer : "",
        date:
          dateFind && dateFind.type == "DEFAULT"
            ? new Date(dateFind.answer).toLocaleTimeString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
      };
    });

  return (
    <Table colCount={COL_COUNT} rowCount={ROW_COUNT} onClick={() => {}}>
      <Thead>
        <Tr>
          <Th>
            <BaseCheckbox aria-label="Select all entries" />
          </Th>
          <Th>
            <Typography variant="sigma">Index</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Name</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Email</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Date</Typography>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {formattedResults.map((result, index) => (
          <ClickableTr key={result.email + result.date}>
            <Td>
              <BaseCheckbox aria-label={`Select ${index + 1}`} />
            </Td>
            <Td>
              <Typography textColor="neutral800">{index + 1}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{result.name}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{result.email}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{result.date}</Typography>
            </Td>
          </ClickableTr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ResultsList;

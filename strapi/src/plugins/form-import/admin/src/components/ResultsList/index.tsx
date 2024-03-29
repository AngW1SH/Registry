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

  const { results, form, selected, setSelected } = useFormStore();

  const formattedResults = results.map((result, index) => {
    const nameFind = result.value.find(
      (row) => row.question == "Фамилия Имя Отчество"
    );
    const identifierFind = result.value.find(
      (row) => row.question == form?.identifiers[0]?.question
    );
    const dateFind = result.value.find((row) => (row.question = "Timestamp"));

    return {
      name: nameFind && nameFind.type == "DEFAULT" ? nameFind.answer : "",
      selected: selected.includes(index),
      status: result.status,
      identifier:
        identifierFind && identifierFind.type == "DEFAULT"
          ? identifierFind.answer
          : "",
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

  const handleCheck = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.dataset.select) {
      Array.from(e.currentTarget.children).forEach((child, index) => {
        if (child.contains(e.target as HTMLElement)) {
          if (selected.includes(index)) {
            setSelected(selected.filter((elem) => elem != index));
          } else {
            setSelected([...selected, index]);
          }
        }
      });
    }
  };

  const handleCheckAll = (e: React.MouseEvent) => {
    if (results.length && selected.length == results.length) {
      setSelected([]);
    } else {
      setSelected(results.map((result, index) => index));
    }
  };

  if (!results || !results.length) return <></>;

  return (
    <Table colCount={COL_COUNT} rowCount={ROW_COUNT} onClick={() => {}}>
      <Thead>
        <Tr>
          <Th>
            <BaseCheckbox
              aria-label="Select all entries"
              indeterminate={
                selected.length && selected.length < results.length
              }
              value={results.length && selected.length == results.length}
              onClick={handleCheckAll}
            />
          </Th>
          <Th>
            <Typography variant="sigma">Index</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Name</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">
              {form && form.identifiers[0].question}
            </Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Date</Typography>
          </Th>
        </Tr>
      </Thead>
      <Tbody onClick={handleCheck}>
        {formattedResults.map((result, index) => (
          <ClickableTr
            status={result.status}
            key={result.identifier + result.date}
          >
            <Td>
              <BaseCheckbox
                data-select={index}
                aria-label={`Select ${index + 1}`}
                value={result.selected}
              />
            </Td>
            <Td>
              <Typography textColor="neutral800">{index + 1}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{result.name}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">
                {result.identifier}
              </Typography>
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

import React, { FC } from "react";
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

interface ResultsListProps {}

const ResultsList: FC<ResultsListProps> = () => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;

  const results = [
    {
      name: "Иванов Сергей Александрович",
      date: new Date(),
    },
    {
      name: "Иванов Сергей Алекса2ндрович",
      date: new Date(),
    },
    {
      name: "Иванов Сергей Алекс1андрович",
      date: new Date(),
    },
  ];

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
            <Typography variant="sigma">Date</Typography>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {results.map((result, index) => (
          <ClickableTr key={result.date.toDateString() + result.name}>
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
              <Typography textColor="neutral800">
                {new Date(result.date).toLocaleDateString("ru-Ru", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Typography>
            </Td>
          </ClickableTr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ResultsList;

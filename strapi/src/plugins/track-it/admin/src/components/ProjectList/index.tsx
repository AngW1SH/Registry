import React, { FC } from "react";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  BaseCheckbox,
  Typography,
} from "@strapi/design-system";
import { UpdateButton } from "./styles";

const ProjectList = () => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;

  const results = [
    {
      id: "testid",
      name: "testname",
      startDate: new Date(),
      syncDate: new Date(),
      endDate: new Date(),
    },
    {
      id: "anothertestid",
      name: "testname2",
      startDate: new Date(),
      syncDate: new Date(),
      endDate: new Date(),
    },
    {
      id: "testi22d",
      name: "testname3",
      startDate: new Date(),
      syncDate: new Date(),
      endDate: new Date(),
    },
  ];

  return (
    <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
      <Thead>
        <Tr>
          <Th>
            <Typography variant="sigma">Id</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Name</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Start Date</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Latest Sync</Typography>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {results.map((result, index) => (
          <Tr key={result.id}>
            <Td>
              <Typography textColor="neutral800">{result.id}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{result.name}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">
                {result.startDate.toLocaleDateString()}
              </Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">
                {result.syncDate.toLocaleDateString()}
              </Typography>
            </Td>
            <Td>
              <UpdateButton variant="default">Update</UpdateButton>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ProjectList;

import React, { FC } from "react";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Loader,
  Typography,
} from "@strapi/design-system";
import { TableColumn, UpdateButton } from "./styles";
import { useProjectStore } from "../../entities/Project";

const ProjectList = () => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;

  const { projects, isLoading, filter, updateProject } = useProjectStore();

  const filtered = projects.filter(
    (project) => project.name.indexOf(filter) !== -1
  );

  if (isLoading || !projects)
    return (
      <Flex justifyContent="center" alignItems="center" height="90vh">
        <Loader>Loading content...</Loader>
      </Flex>
    );

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
        {filtered.map((project, index) => (
          <Tr key={project.id}>
            <TableColumn title={project.id}>
              <Typography textColor="neutral800">{project.id}</Typography>
            </TableColumn>
            <TableColumn title={project.name}>
              <Typography textColor="neutral800">{project.name}</Typography>
            </TableColumn>
            <TableColumn
              title={project?.startDate?.toLocaleDateString() || "N/A"}
            >
              <Typography textColor="neutral800">
                {project?.startDate?.toLocaleDateString() || "N/A"}
              </Typography>
            </TableColumn>
            <TableColumn
              title={project?.syncDate?.toLocaleDateString() || "N/A"}
            >
              <Typography textColor="neutral800">
                {project?.syncDate?.toLocaleDateString() || "N/A"}
              </Typography>
            </TableColumn>
            <TableColumn>
              <UpdateButton
                variant="secondary"
                onClick={() => updateProject(project.id)}
              >
                Update
              </UpdateButton>
            </TableColumn>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ProjectList;

import React, { FC } from "react";
import pluginId from "../../pluginId";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  IconButton,
  Box,
  Flex,
  BaseCheckbox,
  Typography,
  VisuallyHidden,
} from "@strapi/design-system";
import { Plus, Pencil, Trash } from "@strapi/icons";
import { IDraftInList } from "../../entities/Draft/types";

interface DraftListProps {
  drafts: IDraftInList[];
}

const DraftList: FC<DraftListProps> = ({ drafts }) => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;

  return (
    <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
      <Thead>
        <Tr>
          <Th>
            <BaseCheckbox aria-label="Select all entries" />
          </Th>
          <Th>
            <Typography variant="sigma">ID</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Name</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">CreatedAt</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">UpdatedAt</Typography>
          </Th>
          <Th>
            <VisuallyHidden>Actions</VisuallyHidden>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {drafts.map((entry) => (
          <Tr key={entry.id}>
            <Td>
              <BaseCheckbox aria-label={`Select ${entry.name}`} />
            </Td>
            <Td>
              <Typography textColor="neutral800">{entry.id}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{entry.name}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">
                {new Date(entry.createdAt).toLocaleDateString("ru-Ru", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">
                {new Date(entry.updatedAt).toLocaleDateString("ru-Ru", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Typography>
            </Td>
            <Td>
              <Flex>
                <IconButton
                  onClick={() => console.log("edit")}
                  label="Edit"
                  noBorder
                  icon={<Pencil />}
                />
                <Box paddingLeft={1}>
                  <IconButton
                    onClick={() => console.log("delete")}
                    label="Delete"
                    noBorder
                    icon={<Trash />}
                  />
                </Box>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DraftList;

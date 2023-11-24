import React, { FC, MouseEvent, useState, useEffect } from "react";
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
import { Pencil, Trash } from "@strapi/icons";
import { IDraftInList } from "../../entities/Draft/types";
import { useHistory } from "react-router-dom";
import { ClickableTr } from "./styles";
import DraftDelete from "../DraftDelete";
import { useFetchClient } from "@strapi/helper-plugin";

interface DraftListProps {
  drafts: IDraftInList[];
  setDrafts: (drafts: IDraftInList[]) => any;
}

const DraftList: FC<DraftListProps> = ({ drafts, setDrafts }) => {
  const { get } = useFetchClient();

  const history = useHistory();

  const ROW_COUNT = 6;
  const COL_COUNT = 10;

  const handleTableRowClick = (e: MouseEvent<HTMLElement>) => {
    const closestRedirect = (e.target as HTMLElement).closest(
      "tr[data-redirect]"
    );

    if (
      closestRedirect &&
      closestRedirect instanceof HTMLElement &&
      closestRedirect.dataset.redirect !== undefined
    ) {
      history.push("/plugins/team-builder/" + closestRedirect.dataset.redirect);
    }
  };

  const onDraftDelete = (id: number) => {
    setDrafts(drafts.filter((draft) => draft.id != id));
  };

  return (
    <Table
      colCount={COL_COUNT}
      rowCount={ROW_COUNT}
      onClick={handleTableRowClick}
    >
      <Thead>
        <Tr>
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
          <ClickableTr key={entry.id} data-redirect={entry.id}>
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
              <Flex justifyContent="flex-end">
                <IconButton
                  onClick={() => console.log("edit")}
                  label="Edit"
                  noBorder
                  icon={<Pencil />}
                />
                <Box paddingLeft={1}>
                  <DraftDelete id={entry.id} onDelete={onDraftDelete} />
                </Box>
              </Flex>
            </Td>
          </ClickableTr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DraftList;

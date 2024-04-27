import styled from "styled-components";

import { Button, Td } from "@strapi/design-system";

export const UpdateButton = styled(Button)`
  margin-left: auto;
`;

export const TableColumn = styled(Td)`
  max-width: 35%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

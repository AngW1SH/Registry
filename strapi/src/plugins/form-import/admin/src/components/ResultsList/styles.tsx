import styled from "styled-components";
import { Tr } from "@strapi/design-system";
import { ImportStatus } from "../../entities/Form";

interface ResultsTrProps {
  status: ImportStatus;
}

const statusToColor = {
  [ImportStatus.default]: "inherit",
  [ImportStatus.fulfilled]: "#bbf7d0",
  [ImportStatus.rejected]: "#ef4444",
};

export const ClickableTr = styled(Tr)<ResultsTrProps>`
  cursor: pointer;
  background: ${(props) =>
    statusToColor[props.status as keyof typeof statusToColor] || ""};
`;

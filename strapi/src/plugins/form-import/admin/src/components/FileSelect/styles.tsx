import styled from "styled-components";
import { Typography } from "@strapi/design-system";

export const TypographyFlex = styled(Typography)`
  display: flex;
  align-items: center;
`;

export const TypographyAsterisk = styled(Typography)`
  line-height: 0;
`;

export const FileButton = styled.label`
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid rgb(220, 220, 228);
  border-radius: 4px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
`;

export const SelectedFileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
`;

export const SelectedFile = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 50px);
`;

export const ChangeFile = styled.button`
  min-width: 20px;
`;

export const DeleteFile = styled.button`
  min-width: 20px;
`;

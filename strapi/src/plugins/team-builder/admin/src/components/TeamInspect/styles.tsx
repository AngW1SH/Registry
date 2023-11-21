import styled from "styled-components";

export const TableContainer = styled.div`
  & > div > div > div {
    padding-right: 0px;
  }

  & table {
    display: inline-block;
    margin-bottom: -2px;
    overflow: auto;
    max-height: 50vh;
  }
`;

export const TableQuestion = styled.div`
  display: inline-block;
  white-space: normal;
  width: 16vw;
  font-size: 12px;
`;

interface TableAnswerProps {
  widthWV?: number;
}

export const TableAnswer = styled.div<TableAnswerProps>`
  display: inline-block;
  white-space: normal;
  width: ${(props) => props.widthWV || 11}vw;
  font-size: 12px;
`;

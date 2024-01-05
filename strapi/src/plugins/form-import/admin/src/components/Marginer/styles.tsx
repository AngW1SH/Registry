import styled from "styled-components";

type MarginerProps = {
  vertical?: number;
  horizontal?: number;
};
export const Marginer = styled.div<MarginerProps>`
  padding-right: ${(props) => (props.horizontal ? props.horizontal : 0)}px;
  padding-top: ${(props) => (props.vertical ? props.vertical : 0)}px;
`;

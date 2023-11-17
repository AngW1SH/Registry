import styled from "styled-components";

export const TeamListStyled = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
`;

export const TeamInList = styled.li`
  text-align: center;
`;

export const AddTeamInList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  cursor: pointer;

  & svg {
    height: 40px;
    width: 40px;
  }
`;

export const TeamName = styled.h3`
  text-align: center;
  font-weight: 500;
  font-size: 21px;
  cursor: pointer;
`;

export const StudentList = styled.ul`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export const StudentInList = styled.li`
  white-space: nowrap;
  & > div {
    height: 100%;
  }
`;

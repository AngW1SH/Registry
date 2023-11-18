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
  user-select: none;
`;

export const StudentInList = styled.li`
  white-space: nowrap;
  height: 35px;
  position: relative;
  user-select: none;
`;

export const StudentBorder = styled.div`
  position: absolute;
  inset: 0;
  border: 1px dashed #d9d8ff;
  user-select: none;
`;

export const StudentBackground = styled.div`
  position: absolute;
  inset: 0;
  border: 1px dashed #d9d8ff;
  background-color: #f0f0ff;
  user-select: none;
`;

export const Draggable = styled.div`
  position: relative;
  padding: 9px 20px;
  user-select: none;
  background: #f0f0ff;
  border: 1px solid #d9d8ff;
  color: #7b79ff;
`;

export const StudentRemove = styled.div`
  position: absolute;
  height: 15px;
  width: 15px;
  transform: rotate(45deg);
  top: calc(50% - 6px);
  right: 10px;

  & svg {
    height: 100%;
    width: 100%;
  }
`;

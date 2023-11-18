import React, { FC, useState } from "react";
import { Box } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import {
  AddTeamInList,
  Draggable,
  StudentBackground,
  StudentBorder,
  StudentInList,
  StudentList,
  StudentRemove,
  TeamInList,
  TeamListStyled,
  TeamName,
} from "./styles";
import Marginer from "../shared/Marginer";
import { useDnD } from "./hooks/useDnD";
import { useDraftTeamsStore } from "../../entities/Team/model";
import { formatNameShort, useStudentStore } from "../../entities/Student";
import { ITeam } from "../../entities/Team";
import UserAdd from "../UserAdd";

interface TeamListProps {}

const TeamList: FC<TeamListProps> = () => {
  const { draggedTo, handleDragStart } = useDnD();
  const [userAddTeamIndex, setUserAddTeamIndex] = useState<number | null>(null);

  const { teams, addStudents, removeStudent } = useDraftTeamsStore();

  return (
    <>
      {userAddTeamIndex !== null && (
        <UserAdd
          onCancel={() => setUserAddTeamIndex(null)}
          onConfirm={(students) => {
            addStudents(userAddTeamIndex, students);
            setUserAddTeamIndex(null);
          }}
        />
      )}
      <TeamListStyled onMouseDown={handleDragStart}>
        {teams.map((team, index) => (
          <TeamInList>
            <Box
              background="neutral0"
              hasRadius
              shadow="filterShadow"
              paddingTop={8}
              paddingBottom={8}
              paddingLeft={7}
              paddingRight={7}
              height="100%"
            >
              <TeamName>Team 1</TeamName>
              <Marginer vertical={20} />
              <StudentList>
                {team.students.map((student, studentIndex) => (
                  <>
                    {draggedTo.teamIndex == index &&
                      draggedTo.studentIndex == studentIndex && (
                        <StudentInList>
                          <StudentBorder />
                        </StudentInList>
                      )}
                    <StudentInList>
                      <StudentBackground />
                      <Box
                        background="neutral0"
                        hasRadius
                        shadow="filterShadow"
                        height="35px"
                      >
                        <Draggable data-drag>
                          <StudentRemove
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              removeStudent(index, studentIndex);
                            }}
                          >
                            <Plus />
                          </StudentRemove>
                          {formatNameShort(student.name)}
                        </Draggable>
                      </Box>
                    </StudentInList>
                  </>
                ))}
                {draggedTo.teamIndex == index &&
                  draggedTo.studentIndex == team.students.length && (
                    <StudentInList>
                      <StudentBorder />
                    </StudentInList>
                  )}
              </StudentList>
              <Marginer vertical={10} />
              <Box
                background="primary100"
                hasRadius
                shadow="filterShadow"
                paddingTop={3}
                paddingBottom={3}
                paddingLeft={7}
                paddingRight={7}
                onClick={() => setUserAddTeamIndex(index)}
              >
                <Plus />
              </Box>
            </Box>
          </TeamInList>
        ))}
      </TeamListStyled>
    </>
  );
};

export default TeamList;

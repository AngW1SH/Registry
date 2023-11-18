import React, { FC } from "react";
import { Box } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import {
  AddTeamInList,
  StudentInList,
  StudentList,
  TeamInList,
  TeamListStyled,
  TeamName,
} from "./styles";
import Marginer from "../shared/Marginer";
import TeamInspect from "../TeamInspect";

interface TeamListProps {}

const TeamList: FC<TeamListProps> = () => {
  return (
    <>
      <TeamInspect />
      <TeamListStyled>
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
              <StudentInList>
                <Box
                  background="primary100"
                  hasRadius
                  shadow="filterShadow"
                  paddingTop={3}
                  paddingBottom={3}
                  paddingLeft={7}
                  paddingRight={7}
                >
                  Лалуев Д.В.
                </Box>
              </StudentInList>
              <StudentInList>
                <Box
                  background="primary100"
                  hasRadius
                  shadow="filterShadow"
                  paddingTop={3}
                  paddingBottom={3}
                  paddingLeft={7}
                  paddingRight={7}
                >
                  Габдрахманов Д.В.
                </Box>
              </StudentInList>
              <StudentInList>
                <Box
                  background="primary100"
                  hasRadius
                  shadow="filterShadow"
                  paddingTop={3}
                  paddingBottom={3}
                  paddingLeft={7}
                  paddingRight={7}
                >
                  Павлов М.
                </Box>
              </StudentInList>
              <StudentInList>
                <Box
                  background="primary100"
                  hasRadius
                  shadow="filterShadow"
                  paddingTop={3}
                  paddingBottom={3}
                  paddingLeft={7}
                  paddingRight={7}
                >
                  Чернов А.А.
                </Box>
              </StudentInList>
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
            >
              <Plus />
            </Box>
          </Box>
        </TeamInList>
        <TeamInList>
          <Box
            background="neutral0"
            hasRadius
            shadow="filterShadow"
            paddingTop={8}
            paddingBottom={8}
            paddingLeft={7}
            paddingRight={7}
          >
            <TeamName>Team 1</TeamName>
            <Marginer vertical={20} />
            <StudentList>
              <StudentInList>
                <Box
                  background="primary100"
                  hasRadius
                  shadow="filterShadow"
                  paddingTop={3}
                  paddingBottom={3}
                  paddingLeft={7}
                  paddingRight={7}
                >
                  Лалуев Д.В.
                </Box>
              </StudentInList>
              <StudentInList>
                <Box
                  background="primary100"
                  hasRadius
                  shadow="filterShadow"
                  paddingTop={3}
                  paddingBottom={3}
                  paddingLeft={7}
                  paddingRight={7}
                >
                  Габдрахманов Д.В.
                </Box>
              </StudentInList>
              <StudentInList>
                <Box
                  background="primary100"
                  hasRadius
                  shadow="filterShadow"
                  paddingTop={3}
                  paddingBottom={3}
                  paddingLeft={7}
                  paddingRight={7}
                >
                  Павлов М.
                </Box>
              </StudentInList>
              <StudentInList>
                <Box
                  background="primary100"
                  hasRadius
                  shadow="filterShadow"
                  paddingTop={3}
                  paddingBottom={3}
                  paddingLeft={7}
                  paddingRight={7}
                >
                  Чернов А.А.
                </Box>
              </StudentInList>
              <StudentInList>
                <Box
                  background="primary100"
                  hasRadius
                  shadow="filterShadow"
                  paddingTop={3}
                  paddingBottom={3}
                  paddingLeft={7}
                  paddingRight={7}
                >
                  Дюкчубаева Р.И.
                </Box>
              </StudentInList>
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
            >
              <Plus />
            </Box>
          </Box>
        </TeamInList>
        <TeamInList>
          <Box
            background="primary100"
            hasRadius
            shadow="filterShadow"
            paddingTop={3}
            paddingBottom={3}
            paddingLeft={7}
            paddingRight={7}
            height="100%"
            width="100%"
          >
            <AddTeamInList>
              <Plus />
            </AddTeamInList>
          </Box>
        </TeamInList>
      </TeamListStyled>
    </>
  );
};

export default TeamList;

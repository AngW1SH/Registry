import { ITeam } from "..";
import { staticStudentList } from "../../Student/static";

export const staticTeamList: ITeam[] = [
  {
    students: [staticStudentList[0]],
  },
  {
    students: [staticStudentList[1], staticStudentList[2]],
  },
];

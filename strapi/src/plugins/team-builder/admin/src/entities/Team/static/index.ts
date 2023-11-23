import { ITeam } from "..";
import { staticStudentList } from "../../Student/static";

export const staticTeamList: ITeam[] = [
  {
    students: [staticStudentList[0].id],
  },
  {
    students: [staticStudentList[1].id, staticStudentList[2].id],
  },
];

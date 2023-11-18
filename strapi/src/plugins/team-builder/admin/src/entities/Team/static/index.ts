import { ITeam } from "..";
import { staticStudentList } from "../../Student/static";

export const staticTeamList: ITeam[] = [
  {
    id: 1,
    name: "Команда 1",
    students: [staticStudentList[0]],
  },
  {
    id: 2,
    name: "Команда 2",
    students: [staticStudentList[1], staticStudentList[2]],
  },
];

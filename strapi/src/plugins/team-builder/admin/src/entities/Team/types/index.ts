import { IStudent } from "../../Student";
import { IStudentDetailed } from "../../Student/types";

export interface ITeam {
  id: number;
  name: string;
  students: IStudentDetailed[];
}

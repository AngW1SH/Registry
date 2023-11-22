import { IStudent } from "../../Student";
import { IStudentDetailed } from "../../Student/types";

export interface ITeam {
  students: IStudentDetailed[];
}

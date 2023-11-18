import { IStudent } from "../../Student";

export interface ITeam {
  id: number;
  name: string;
  students: IStudent[];
}

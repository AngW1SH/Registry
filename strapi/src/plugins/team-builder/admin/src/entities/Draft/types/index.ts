import { IForm } from "../../Form";
import { IStudent } from "../../Student";
import { ITeam } from "../../Team";

export interface IDraft {
  id: number;
  name: string;
  form: IForm | null;
  students: IStudent[];
  teams: ITeam[];
}

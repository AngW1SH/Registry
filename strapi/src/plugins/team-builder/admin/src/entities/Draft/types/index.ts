import { IForm } from "../../Form";
import { IStudent } from "../../Student";
import { ITeam } from "../../Team";

export interface IDraft {
  id: number;
  name: string;
  form: number | null;
  students: IStudent[];
  teams: ITeam[];
}

export interface IDraftDTO {
  id: number;
  name: string;
  form: number | null;
}

export interface IDraftInList {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}

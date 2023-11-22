import { IForm } from "../../Form";
import { IStudent } from "../../Student";
import { ITeam } from "../../Team";

export interface IDraft {
  id: number;
  name: string;
  form: number | null;
  activeStudents: number[];
  teams: number[][];
}

export interface IDraftDTO {
  id: number;
  name: string;
  form: number | null;
  activeStudents: number[];
}

export interface IDraftInList {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}

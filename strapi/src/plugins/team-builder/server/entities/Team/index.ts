import { UserDetailed } from "../User";

export interface Team {
  id: number;
  name: string;
  students: UserDetailed[];
}

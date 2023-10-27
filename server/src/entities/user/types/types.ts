import { FormResultClient } from "@/entities/form";
import { Member } from "@/entities/member";
import { Project, ProjectReference } from "@/entities/project";
import { Request } from "@/entities/request";
import { Team } from "@/entities/team";

export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserCreate = Omit<User, "id">;

export interface UserProjectStatusData {
  assignableTeams: number[]; // The administrated teams that haven't applied for the project
  hasApplied: boolean; // Whether there's a team that has applied (administrated or not)
}

export interface UserProfileData {
  forms: FormResultClient[];
  projects: ProjectReference[];
  requests: Request[];
  teams: Team[];
  users: User[];
  members: Member[];
}

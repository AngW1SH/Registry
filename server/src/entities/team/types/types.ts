import { ProjectDocument } from "@/entities/components/project-document";

export interface Team {
  id: number;
  name: string;
  members: number[];
  project?: string | null;
  requests?: number[];
  documents?: ProjectDocument[];
}
export interface TeamWithAdministrators extends Team {
  administrators: number[];
}

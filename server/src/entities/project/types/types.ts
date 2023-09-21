import { Tag } from "@/entities/tag";

export interface Project {
  id: string;
  name: string;
  description: string;
  developerRequirements: string;
  dateStart: Date;
  dateEnd: Date;
  enrollmentStart: Date;
  enrollmentEnd: Date;
  //createdAt: Date;
  supervisor: string;
  tags: string[];
  //teamId: string;
  isPublic: boolean;
}

export interface ProjectWithTags extends Omit<Project, "tags"> {
  tags: Tag[];
}

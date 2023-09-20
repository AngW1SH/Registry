import { Project } from "@/entities/project";
import projectRepository from "@/repositories/project";

export const create = (project: Project) => {
  const result = projectRepository.add(project);

  return result;
};

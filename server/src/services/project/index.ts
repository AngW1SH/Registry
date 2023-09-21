import { Project } from "@/entities/project";
import { Tag } from "@/entities/tag";
import { flattenProjects } from "@/helpers/project";
import projectRepository from "@/repositories/project";

const projectServiceFactory = () => {
  return Object.freeze({
    getActive,
    getNew,
  });

  async function getActive(tagIds?: string[]) {
    const projectsWithTags = await projectRepository.getActive(tagIds);

    return flattenProjects(projectsWithTags);
  }

  async function getNew() {
    const projectsWithTags = await projectRepository.getNew(6);

    return flattenProjects(projectsWithTags);
  }
};

const projectService = projectServiceFactory();

export default projectService;

import { Project } from "@/entities/project";
import { flattenProjects } from "@/helpers/project";
import projectRepository from "@/repositories/project";

const projectServiceFactory = () => {
  return Object.freeze({
    getActive,
    getNew,
  });

  async function getActive() {
    const projectsWithTags = await projectRepository.getActive();

    return flattenProjects(projectsWithTags);
  }

  async function getNew() {
    const projectsWithTags = await projectRepository.getNew(6);

    return flattenProjects(projectsWithTags);
  }
};

const projectService = projectServiceFactory();

export default projectService;

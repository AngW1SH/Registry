import { Project } from "@/entities/project";
import { flattenProjects } from "@/helpers/project";
import projectRepository from "@/repositories/project";

const projectServiceFactory = () => {
  return Object.freeze({
    getActive,
  });

  async function getActive() {
    const projectsWithTags = await projectRepository.getActive();

    return flattenProjects(projectsWithTags);
  }
};

const projectService = projectServiceFactory();

export default projectService;

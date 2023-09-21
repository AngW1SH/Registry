import { Project } from "@/entities/project";
import projectRepository from "@/repositories/project";

const projectServiceFactory = () => {
  return Object.freeze({
    getActive,
  });

  async function getActive() {
    return await projectRepository.getActive();
  }
};

const projectService = projectServiceFactory();

export default projectService;

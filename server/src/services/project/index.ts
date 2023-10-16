import { ProjectFilters } from "@/entities/project";
import { flattenProject, flattenProjects } from "@/entities/project";
import projectRepository from "@/repositories/project";

const projectServiceFactory = () => {
  return Object.freeze({
    getActive,
    getNew,
    findById,
    findMany,
  });

  async function getActive(tagIds?: string[]) {
    return projectRepository.findMany({
      dateStart: new Date(),
      dateEnd: new Date(),
      tags: tagIds,
    });
  }

  async function getNew() {
    return projectRepository.getNew(6);
  }

  async function findById(id: number) {
    return projectRepository.findOne(id);
  }

  async function findMany(filters?: ProjectFilters) {
    return projectRepository.findMany(filters);
  }
};

const projectService = projectServiceFactory();

export default projectService;

import { ProjectFilters } from "@/entities/project";
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

  async function findMany(filters?: ProjectFilters, page?: number) {
    return projectRepository.findMany(filters, page);
  }
};

const projectService = projectServiceFactory();

export default projectService;

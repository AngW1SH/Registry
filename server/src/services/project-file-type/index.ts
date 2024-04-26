import { ProjectFileType } from "@/entities/project-file-type";
import projectFileTypeRepository from "@/repositories/project-file-type";

const projectFileTypeServiceFactory = () => {
  return Object.freeze({
    findAll,
    findOne,
  });

  async function findAll(): Promise<ProjectFileType[]> {
    return projectFileTypeRepository.findAll();
  }

  async function findOne(id: number): Promise<ProjectFileType | null> {
    return projectFileTypeRepository.findOne(id);
  }
};

const projectFileTypeService = projectFileTypeServiceFactory();

export default projectFileTypeService;

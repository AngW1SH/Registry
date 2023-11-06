import { ProjectFilters } from "@/entities/project";
import { User } from "@/entities/user";
import { ServerError } from "@/helpers/errors";
import projectRepository from "@/repositories/project";
import { UploadedFile } from "express-fileupload";

const projectServiceFactory = () => {
  return Object.freeze({
    getActive,
    getNew,
    findById,
    findMany,
    uploadResultFiles,
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

  async function uploadResultFiles(
    projectId: number,
    files: UploadedFile[],
    user: User
  ) {
    const projectFindResult = await projectRepository.findOne(projectId);

    if (!projectFindResult || !projectFindResult.project)
      throw new ServerError("Couldn't find the project");

    if (!projectFindResult.administrators)
      throw new ServerError("Project has no administrators");

    const isAllowed = projectFindResult.administrators.reduce((acc, admin) => {
      return admin.id == user.id ? true : acc;
    }, false);

    if (!isAllowed)
      throw new ServerError("User not authorized to perform this action");

    return projectRepository.addResultFiles(projectId, files);
  }
};

const projectService = projectServiceFactory();

export default projectService;

import { User } from "@/entities/user";
import { ServerError, UnauthorizedError } from "@/helpers/errors";
import projectRepository from "@/repositories/project";
import projectResultsRepository from "@/repositories/project-results";
import { UploadedFile } from "express-fileupload";

const projectResultsServiceFactory = () => {
  return Object.freeze({
    uploadFiles,
    deleteFile,
    changeFile,
  });

  async function uploadFiles(
    projectId: string,
    files: UploadedFile[],
    user: User
  ) {
    const projectFindResult = await projectRepository.findOne(projectId, {
      includeAdmin: true,
    });

    if (!projectFindResult || !projectFindResult.project)
      throw new ServerError("Couldn't find the project");

    if (!projectFindResult.administrators)
      throw new ServerError("Project has no administrators");

    const isAllowed = projectFindResult.administrators.reduce((acc, admin) => {
      return admin.id == user.id ? true : acc;
    }, false);

    if (!isAllowed)
      throw new UnauthorizedError("User not authorized to perform this action");

    return projectResultsRepository.addFiles(projectId, files);
  }

  async function deleteFile(projectId: string, fileId: number, user: User) {
    const projectFindResult = await projectRepository.findOne(projectId, {
      includeAdmin: true,
    });

    if (!projectFindResult || !projectFindResult.project)
      throw new ServerError("Couldn't find the project");

    if (!projectFindResult.administrators)
      throw new ServerError("Project has no administrators");

    const isAllowed = projectFindResult.administrators.reduce((acc, admin) => {
      return admin.id == user.id ? true : acc;
    }, false);

    if (!isAllowed)
      throw new UnauthorizedError("User not authorized to perform this action");

    return projectResultsRepository.deleteFile(projectId, fileId);
  }

  async function changeFile(
    projectId: string,
    fileId: number,
    file: UploadedFile,
    user: User
  ) {
    const projectFindResult = await projectRepository.findOne(projectId, {
      includeAdmin: true,
    });

    if (!projectFindResult || !projectFindResult.project)
      throw new ServerError("Couldn't find the project");

    if (!projectFindResult.administrators)
      throw new ServerError("Project has no administrators");

    const isAllowed = projectFindResult.administrators.reduce((acc, admin) => {
      return admin.id == user.id ? true : acc;
    }, false);

    if (!isAllowed)
      throw new UnauthorizedError("User not authorized to perform this action");

    return projectResultsRepository.changeFile(projectId, fileId, file);
  }
};

const projectResultsService = projectResultsServiceFactory();

export default projectResultsService;

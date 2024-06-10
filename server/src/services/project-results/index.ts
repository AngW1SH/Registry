import { User } from "@/entities/user";
import { ServerError, UnauthorizedError } from "@/helpers/errors";
import projectRepository from "@/repositories/project";
import projectResultsRepository from "@/repositories/project-results";
import { UploadedFile } from "express-fileupload";
import projectFileTypeService from "../project-file-type";

const projectResultsServiceFactory = () => {
  return Object.freeze({
    uploadFile,
    deleteFile,
    changeFile,
  });

  async function uploadFile(
    projectId: string,
    teamId: number,
    file: UploadedFile,
    category: string,
    user: User
  ) {
    const projectFindResult = await projectRepository.findOne(projectId, {
      includeAdmin: true,
      includeAllDocuments: true,
    });

    const team = projectFindResult?.teams?.find((team) => team.id == teamId);

    if (!team) throw new ServerError("Team not found");

    const isInTeam = projectFindResult?.members.find(
      (member) => member?.user == user.id && member.team == teamId
    );
    if (!isInTeam) throw new ServerError("User not in team");

    const allFileTypes = await projectFileTypeService.findAll();

    const fileType = allFileTypes.find((fileType) => fileType.name == category);

    if (!fileType || !fileType.id) {
      throw new ServerError("Category not allowed");
    }

    if (!projectFindResult || !projectFindResult.project)
      throw new ServerError("Couldn't find the project");

    if (!projectFindResult.administrators)
      throw new ServerError("Project has no administrators");

    const isAllowed = projectFindResult.administrators.reduce((acc, admin) => {
      return admin.id == user.id ? true : acc;
    }, false);

    if (!isAllowed)
      throw new UnauthorizedError("User not authorized to perform this action");

    return projectResultsRepository.addFile(team.id, file, fileType);
  }

  async function deleteFile(projectId: string, fileId: number, user: User) {
    const projectFindResult = await projectRepository.findOne(projectId, {
      includeAdmin: true,
      includeAllDocuments: true,
    });

    const team = projectFindResult?.teams?.find((team) =>
      team.documents?.find((doc) => doc.id == fileId)
    );

    if (!team) throw new ServerError("Team not found");

    const isInTeam = projectFindResult?.members.find(
      (member) => member?.user == user.id && member.team == team.id
    );
    if (!isInTeam) throw new ServerError("User not in team");

    if (!projectFindResult || !projectFindResult.project)
      throw new ServerError("Couldn't find the project");

    if (!projectFindResult.administrators)
      throw new ServerError("Project has no administrators");

    const isAllowed = projectFindResult.administrators.reduce((acc, admin) => {
      return admin.id == user.id ? true : acc;
    }, false);

    if (!isAllowed)
      throw new UnauthorizedError("User not authorized to perform this action");

    return projectResultsRepository.deleteFile(team.id, fileId);
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

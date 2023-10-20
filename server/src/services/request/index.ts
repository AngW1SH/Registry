import { User } from "@/entities/user";
import requestRepository from "@/repositories/request";
import teamRepository from "@/repositories/team";
import { UploadedFile } from "express-fileupload";

const requestServiceFactory = () => {
  return Object.freeze({
    add,
  });

  async function add(
    team: number,
    project: number,
    user: User,
    files: UploadedFile[]
  ) {
    const teamAdministrators = await teamRepository.getAdministrators(team);
    if (!teamAdministrators.find((admin) => admin.id == user.id))
      throw new Error("Unauthorized");

    return requestRepository.add(team, project, files);
  }
};

const requestService = requestServiceFactory();

export default requestService;

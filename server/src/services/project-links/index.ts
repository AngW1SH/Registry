import { User } from "@/entities/user";
import { ServerError, UnauthorizedError } from "@/helpers/errors";
import platformRepository from "@/repositories/platform";
import projectRepository from "@/repositories/project";
import projectLinksRepository from "@/repositories/project-links";

const projectLinksServiceFactory = () => {
  return Object.freeze({ add });

  async function add(
    projectId: number,
    platformName: string,
    link: string,
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

    const platform = await platformRepository.findOne({ name: platformName });

    if (!platform)
      throw new ServerError("Couldn't find the platform with such name");

    return projectLinksRepository.add(projectId, platform.id, link);
  }
};

const projectLinksService = projectLinksServiceFactory();

export default projectLinksService;

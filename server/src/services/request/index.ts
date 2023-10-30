import { Request } from "@/entities/request";
import { Team } from "@/entities/team";
import { User } from "@/entities/user";
import { UnauthorizedError } from "@/helpers/errors";
import requestRepository from "@/repositories/request";
import teamRepository from "@/repositories/team";
import { UploadedFile } from "express-fileupload";

const requestServiceFactory = () => {
  return Object.freeze({
    add,
    populateTeams,
  });

  async function add(
    team: number,
    project: number,
    user: User,
    files: UploadedFile[]
  ) {
    const teamAdministrators = await teamRepository.getAdministrators(team);
    if (!teamAdministrators.find((admin) => admin.id == user.id))
      throw new UnauthorizedError("User not found in team administrator list");

    return requestRepository.add(team, project, files);
  }

  function populateTeams(teams: Team[], requests: Request[]): Team[] {
    const copy = structuredClone(teams);

    requests &&
      requests.forEach((request) => {
        if (copy) {
          const teamFound = copy?.findIndex((team) => team.id == request.team);
          if (teamFound !== -1) {
            if (!copy[teamFound].requests) copy[teamFound].requests = [];
            copy[teamFound].requests!.push(request.id);
          }
        }
      });

    return copy;
  }
};

const requestService = requestServiceFactory();

export default requestService;

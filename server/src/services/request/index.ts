import { Request } from "@/entities/request";
import { Team } from "@/entities/team";
import { User } from "@/entities/user";
import { ServerError, UnauthorizedError } from "@/helpers/errors";
import requestRepository from "@/repositories/request";
import teamRepository from "@/repositories/team";
import { UploadedFile } from "express-fileupload";

const requestServiceFactory = () => {
  return Object.freeze({
    add,
    populateTeams,
    edit,
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

  async function edit(requestId: number, user: User, files: UploadedFile[]) {
    /*
    I'll make a requestRepository.findOne later,
    for now we can be sure that if there are any requests/teams 
    there can only be one of each, because we filter by request id
    */
    const requestsResult = await requestRepository.findMany({ id: requestId });

    if (
      !requestsResult ||
      !requestsResult.requests ||
      !requestsResult.requests.length
    )
      throw new ServerError("Request not found");

    if (!requestsResult.teams || !requestsResult.teams.length)
      throw new ServerError("No team is assigned to the request");

    const teamAdministrators = await teamRepository.getAdministrators(
      requestsResult.teams[0].id
    );
    if (!teamAdministrators.find((admin) => admin.id == user.id))
      throw new UnauthorizedError("User not found in team administrator list");

    return requestRepository.edit(requestId, files);
  }
};

const requestService = requestServiceFactory();

export default requestService;

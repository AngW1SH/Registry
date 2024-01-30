import { Request } from "@/entities/request";
import { Team } from "@/entities/team";
import { User } from "@/entities/user";
import { ServerError, UnauthorizedError } from "@/helpers/errors";
import projectRepository from "@/repositories/project";
import requestRepository from "@/repositories/request";
import teamRepository from "@/repositories/team";
import { UploadedFile } from "express-fileupload";
import { TeamWithAdministrators } from "@/entities/team/types/types";
import { mergeUnique } from "@/helpers/mergeUnique";

const requestServiceFactory = () => {
  return Object.freeze({
    add,
    populateTeams,
    edit,
    getAvailable,
    deleteOne,
  });

  function isFileValid(file: UploadedFile) {
    if (file.size > 1024 * 1024 * 30) return false; // 30MB

    return true;
  }

  async function add(
    team: number,
    project: string,
    user: User,
    files: UploadedFile[]
  ) {
    const teamAdministrators = await teamRepository.getAdministrators(team);
    if (!teamAdministrators.find((admin) => admin.id == user.id))
      throw new UnauthorizedError("User not found in team administrator list");

    return requestRepository.add(
      team,
      project,
      files.filter((file) => isFileValid(file))
    );
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

    return requestRepository.edit(
      requestId,
      files.filter((file) => isFileValid(file))
    );
  }

  async function getAvailable(user: User) {
    const [projectsResult, teamsResult, requestResult] =
      await Promise.allSettled([
        projectRepository.getAvailable(),
        teamRepository.getUnassignedAdministrated(user.id),
        requestRepository.getActive({ user: user.id }),
      ]);

    if (
      requestResult.status != "fulfilled" ||
      !requestResult.value ||
      !requestResult.value.requests
    )
      throw new ServerError("Couldn't fetch the user's requests");
    const { requests } = requestResult.value;

    const teams = teamsResult.status == "fulfilled" ? teamsResult.value : [];
    const projects =
      projectsResult.status == "fulfilled" && projectsResult.value
        ? projectsResult.value
        : [];

    const result = {
      teams: [] as { id: number; name: string; projects: string[] }[],
      projectReferences: [] as { id: string; name: string }[],
    };

    teams.forEach((team) => {
      const teamProjects = projects
        .filter(
          (project) =>
            !requests.find((request) => request.project == project.id)
        )
        .filter((project) => !project.teams.includes(team.id))
        .map((project) => ({
          id: project.id,
          name: project.name,
        }));

      if (!teamProjects.length) return;

      result.teams.push({
        id: team.id,
        name: team.name,
        projects: teamProjects.map((project) => project.id),
      });
      result.projectReferences = mergeUnique(
        result.projectReferences,
        teamProjects
      );
    });

    return result;
  }

  async function deleteOne(requestId: number, user: User) {
    const userRequests = await requestRepository.getActive(
      { user: user.id },
      { populate: true }
    );

    if (!userRequests || !userRequests.requests)
      throw new ServerError("Couldn't fetch the user's requests");

    const { requests, teams } = userRequests;

    const requestFound = requests.find((request) => {
      const team = teams?.find((team) => team.id == request.team);

      if (!team || !team.hasOwnProperty("administrators")) return false;
      return (
        (team as TeamWithAdministrators).administrators.includes(user.id) &&
        !!requests.find((request) => request.id == requestId) &&
        team.requests?.includes(requestId)
      );
    });

    if (!requestFound)
      throw new UnauthorizedError("User not authorized to perform this action");

    return requestRepository.deleteOne(requestId);
  }
};

const requestService = requestServiceFactory();

export default requestService;

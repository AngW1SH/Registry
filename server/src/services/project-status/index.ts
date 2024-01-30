import { TeamWithAdministrators } from "@/entities/team/types/types";
import { UserProjectStatusData } from "@/entities/user";
import { ServerError, UnauthorizedError } from "@/helpers/errors";
import requestRepository from "@/repositories/request";
import teamRepository from "@/repositories/team";

const projectStatusServiceFactory = () => {
  return Object.freeze({ getAssignableTeams });

  async function getAssignableTeams(
    projectId: number,
    userId?: number | null
  ): Promise<UserProjectStatusData> {
    if (!userId) throw new UnauthorizedError("No userId specified");

    let hasApplied = false;

    const administrated = await teamRepository.getUnassignedAdministrated(
      userId
    );

    const assignableTeams = new Set<number>();
    administrated.forEach((team) => assignableTeams.add(team.id));

    const requestsData = await requestRepository.getActive(
      { project: projectId },
      { populate: true }
    );
    if (!requestsData) throw new ServerError("Couldn't fetch request data");

    const { teams, members, users } = requestsData;

    teams &&
      teams.forEach((team) => {
        // remove all the administrated teams that have already signed up for the project
        team.hasOwnProperty("administrators") &&
          (team as TeamWithAdministrators).administrators.forEach(
            (administrator) => {
              if (administrator === userId) {
                assignableTeams.delete(team.id);
              }
            }
          );

        // try to find at least one user's team that has signed up for the projects
        if (!hasApplied)
          team.members.forEach((teamMember) => {
            const member = members?.find((member) => member.id == teamMember);
            const user = member
              ? users?.find((user) => user.id == userId)
              : null;

            if (user && user.id === userId) hasApplied = true;
          });
      });

    return {
      user: {
        assignableTeams: Array.from(assignableTeams),
        hasTeamApplied: hasApplied,
      },
      teams: teams
        ? Array.from(assignableTeams).map(
            (teamId) => administrated.find((team) => team.id == teamId)!
          )
        : [],
    };
  }
};

const projectStatusService = projectStatusServiceFactory();

export default projectStatusService;

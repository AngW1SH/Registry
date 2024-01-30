import { User, UserProfileData } from "@/entities/user";
import formResultService from "../form-result";
import requestRepository from "@/repositories/request";
import teamRepository from "@/repositories/team";
import { Team } from "@/entities/team";
import { Member } from "@/entities/member";
import requestService from "../request";
import projectRepository from "@/repositories/project";
import { mergeUnique } from "./utils/mergeUnique";

const profileServiceFactory = () => {
  return Object.freeze({ getUserData });

  async function getUserData(user: User): Promise<UserProfileData> {
    const [
      formsResult,
      requestsResult,
      activeTeamsResult,
      activeAdministratedTeamsResult,
    ] = await Promise.allSettled([
      formResultService.getAllByUser(user),
      requestRepository.getActive({ user: user.id }), // not all the requests associated with each team
      teamRepository.getActive(user.id), // is considered 'active', hence the separate calls
      teamRepository.getAdministratedActive(user.id),
    ]);
    const forms =
      formsResult.status == "fulfilled" ? formsResult.value || [] : [];

    const requests =
      requestsResult.status == "fulfilled"
        ? requestsResult.value && requestsResult.value.requests
          ? requestsResult.value.requests
          : []
        : [];

    const { teams, members, users } =
      activeTeamsResult.status == "fulfilled"
        ? activeTeamsResult.value
        : { teams: [] as Team[], members: [] as Member[], users: [] as User[] };

    const {
      teams: adminTeams,
      members: adminMembers,
      users: adminUsers,
    } = activeAdministratedTeamsResult.status == "fulfilled"
      ? activeAdministratedTeamsResult.value
      : { teams: [] as Team[], members: [] as Member[], users: [] as User[] };

    const teamsPopulated = teams
      ? requestService.populateTeams(teams, requests)
      : [];
    const adminTeamsPopulated = adminTeams
      ? requestService.populateTeams(adminTeams, requests)
      : [];

    const usedProjectIds = teams
      ? teams
          .filter((team) => team.project)
          .map((team) => team.project!)
          .concat(
            requests.reduce(
              (acc, cur) => (cur.project ? [...acc, cur.project] : acc),
              [] as string[]
            )
          )
      : [];

    const projects = teams
      ? await projectRepository.getReferences(usedProjectIds)
      : [];

    return {
      forms,
      requests,
      teams: mergeUnique(teamsPopulated, adminTeamsPopulated),
      members: mergeUnique(members, adminMembers),
      users: mergeUnique(users, adminUsers),
      projects: projects!,
      user: {
        teams: teamsPopulated ? teamsPopulated.map((team) => team.id) : [],
        administratedTeams: adminTeamsPopulated
          ? adminTeamsPopulated.map((team) => team.id)
          : [],
        projects:
          teams
            ?.map((team) => team.id)
            .map((teamId) =>
              projects?.find((project) => project.teams.includes(teamId))
            )
            .filter((project) => project)
            .map((project) => project!.id) || [],
      },
    };
  }
};

const profileService = profileServiceFactory();

export default profileService;

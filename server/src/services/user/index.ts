import { User, UserCreate, UserProfileData } from "@/entities/user";
import projectRepository from "@/repositories/project";
import teamRepository from "@/repositories/team";
import userRepository from "@/repositories/user";
import requestRepository from "@/repositories/request";
import { mergeUnique } from "./utils/mergeUnique";
import { Team } from "@/entities/team";
import { Member } from "@/entities/member";
import requestService from "../request";
import formResultService from "../form-result";

const userServiceFactory = () => {
  return Object.freeze({
    findById,
    findOrCreate,
    getProfileData,
  });

  async function findById(id: number): Promise<User | null> {
    const user = await userRepository.findOne({ id: id });

    return user;
  }

  async function findOrCreate(user: UserCreate): Promise<User | null> {
    const userFound = await userRepository.findOne({ email: user.email });

    if (userFound) return userFound;

    const userCreated = await userRepository.create(user);

    return userCreated;
  }

  async function getProfileData(user: User): Promise<UserProfileData> {
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

const userService = userServiceFactory();

export default userService;

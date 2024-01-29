import {
  User,
  UserCreate,
  UserProfileData,
  UserProjectStatusData,
} from "@/entities/user";
import projectRepository from "@/repositories/project";
import teamRepository from "@/repositories/team";
import userRepository from "@/repositories/user";
import requestRepository from "@/repositories/request";
import { mergeUnique } from "./utils/mergeUnique";
import { Team } from "@/entities/team";
import { Member } from "@/entities/member";
import { TeamWithAdministrators } from "@/entities/team/types/types";
import requestService from "../request";
import { ServerError, UnauthorizedError } from "@/helpers/errors";
import formResultService from "../form-result";

const userServiceFactory = () => {
  return Object.freeze({
    findById,
    findOrCreate,
    getProjectStatusData,
    getData,
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

  async function getProjectStatusData(
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

  async function getData(user: User) {
    if (!user) throw new UnauthorizedError("User not specified");

    const { id, ...inlineData } = user;

    const [teams, administrated] = await Promise.allSettled([
      teamRepository.getUnassigned(user.id),
      teamRepository.getUnassignedAdministrated(user.id),
    ]);

    const teamIdList =
      teams.status == "fulfilled" ? teams.value.map((team) => team.id) : [];
    const administratedIdList =
      administrated.status == "fulfilled"
        ? administrated.value.map((team) => team.id)
        : [];

    return {
      user: {
        ...inlineData,
        unassignedTeams: teamIdList,
        unassignedAdministrated: administratedIdList,
      },
      teams: mergeUnique(
        teams.status == "fulfilled" ? teams.value : [],
        administrated.status == "fulfilled" ? administrated.value : []
      ),
    };
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

import {
  User,
  UserCreate,
  UserProfileData,
  UserProjectStatusData,
} from "@/entities/user";
import { generateAccessToken, generateRefreshToken } from "@/helpers/jwt";
import projectRepository from "@/repositories/project";
import teamRepository from "@/repositories/team";
import userRepository from "@/repositories/user";
import { mergeUniqueTeams } from "./utils/mergeUniqueTeams";
import { getRequestFromStrapiDTO } from "@/db/strapi/adapters/team";
import formRepository from "@/repositories/form";
import requestRepository from "@/repositories/request";

const userServiceFactory = () => {
  return Object.freeze({
    findById,
    findOrCreate,
    createTokens,
    getPublicUserInfo,
    getProjectStatusData,
    getData,
    submitForm,
    getProfileData,
  });

  async function findById(id: number): Promise<User | null> {
    const user = await userRepository.findById(id);

    return user;
  }

  async function findOrCreate(user: UserCreate): Promise<User> {
    const userFound = await userRepository.findByEmail(user.email);

    if (userFound) return userFound;

    const userCreated = await userRepository.create(user);

    return userCreated;
  }

  async function createTokens(user: User) {
    return {
      accessToken: generateAccessToken(user.id),
      refreshToken: generateRefreshToken(user.id),
    };
  }

  async function getPublicUserInfo(user: User): Promise<User> {
    return {
      ...user,
      id: undefined,
    };
  }

  async function getProjectStatusData(
    projectId: number,
    userId: number,
    authUser: User
  ): Promise<UserProjectStatusData> {
    if (userId != authUser.id) throw new Error("Access denied");

    const administratedByUser =
      await teamRepository.getUnassignedAdministratedByUser(authUser);

    const assignableTeams = new Set<number>();

    let hasApplied = false;

    administratedByUser.forEach((team) => assignableTeams.add(team.id));

    /*
    TODO:
      move all strapi-related stuff back to the repository
      Services should not care about where the formatted data is fetched from
    */
    const requestsStrapi = await projectRepository.getActiveRequests(projectId);

    const requests = requestsStrapi.data.map((candidate) =>
      getRequestFromStrapiDTO(candidate)
    );

    requests.forEach((teamData) => {
      // remove all the teams that have already signed up for the project
      teamData.administrators.forEach((administrator) => {
        if (administrator.id === userId) {
          assignableTeams.delete(teamData.team.id);
        }
      });

      if (!hasApplied)
        teamData.users.forEach((user) => {
          if (user.id === userId) hasApplied = true;
        });
    });

    return {
      assignableTeams: Array.from(assignableTeams),
      hasApplied,
    };
  }

  async function getData(user: User) {
    if (!user) throw new Error("Unauthorized");

    const { id, ...inlineData } = user;

    const [teams, administrated] = await Promise.allSettled([
      teamRepository.getUnassignedByUser(user),
      teamRepository.getUnassignedAdministratedByUser(user),
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
      teams: mergeUniqueTeams(
        teams.status == "fulfilled" ? teams.value : [],
        administrated.status == "fulfilled" ? administrated.value : []
      ),
    };
  }

  async function submitForm(formId: string, response: any) {
    // Will use an adapter later on
    const user = await userRepository.findByEmail(
      response["Единая учетная запись (например, ST000000)"]
    );

    if (!user) throw new Error("No such user found");

    const form = await formRepository.findByFormId(formId);
    if (!form) throw new Error("No such form found");

    return userRepository.submitForm(form.data[0].id, response, user.id);
  }

  async function getProfileData(user: User): Promise<UserProfileData> {
    const requests = await requestRepository.getActiveByUser(user.id);
    const { teams, members, users } = await teamRepository.getActiveByUser(
      user.id
    );

    const projects = teams
      ? await projectRepository.getReferences(
          teams.filter((team) => team.project).map((team) => team.id)
        )
      : [];

    return {
      requests,
      teams,
      members,
      users,
      projects,
    };
  }
};

const userService = userServiceFactory();

export default userService;

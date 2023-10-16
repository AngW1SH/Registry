import { flattenRequest } from "@/entities/team/utils/flattenTeam";
import { User, UserCreate, UserProjectStatusData } from "@/entities/user";
import { generateAccessToken, generateRefreshToken } from "@/helpers/jwt";
import projectRepository from "@/repositories/project";
import teamRepository from "@/repositories/team";
import userRepository from "@/repositories/user";
import { mergeUniqueTeams } from "./utils/mergeUniqueTeams";

const userServiceFactory = () => {
  return Object.freeze({
    findById,
    findOrCreate,
    createTokens,
    getPublicUserInfo,
    getProjectStatusData,
    getData,
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

    administratedByUser.data.forEach((team) => assignableTeams.add(team.id));

    const candidatesResponse = await projectRepository.getTeamCandidates(
      projectId
    );
    const candidates = candidatesResponse.data.map((candidate) =>
      flattenRequest(candidate)
    );

    candidates.forEach((teamData) => {
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

    if (teams.status == "fulfilled") teams.value;

    const teamsList = teams.status == "fulfilled" ? teams.value.data : [];
    const administratedList =
      administrated.status == "fulfilled" ? administrated.value.data : [];

    return {
      user: {
        ...inlineData,
        unassignedTeams: teamsList.map((team) => team.id),
        unassignedAdministrated: administratedList.map((team) => team.id),
      },
      teams: mergeUniqueTeams(teamsList, administratedList),
    };
  }
};

const userService = userServiceFactory();

export default userService;

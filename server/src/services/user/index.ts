import { flattenTeamWithAdministrators } from "@/entities/team";
import { flattenRequest } from "@/entities/team/utils/flattenTeam";
import { User, UserCreate, UserProjectInfo } from "@/entities/user";
import { generateAccessToken, generateRefreshToken } from "@/helpers/jwt";
import projectRepository from "@/repositories/project";
import userRepository from "@/repositories/user";

const userServiceFactory = () => {
  return Object.freeze({
    findById,
    findOrCreate,
    createTokens,
    getPublicUserInfo,
    getUserProjectInfo,
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

  /*
  TODO: 
      return teams that the user can specify in the application
  HOW: 
      use userRepository to get the list of all the administrated 
      teams with no assigned projects and remove all the teams
      found in the candidates list
  */
  async function getUserProjectInfo(
    projectId: number,
    userId: number,
    authUser: User
  ): Promise<UserProjectInfo> {
    if (userId != authUser.id) throw new Error("Access denied");

    const result: UserProjectInfo = {
      isAdministrator: false,
      hasApplied: false,
    };

    const candidatesResponse = await projectRepository.getTeamCandidates(
      projectId
    );

    const candidates = candidatesResponse.data.map((candidate) =>
      flattenRequest(candidate)
    );

    candidates.forEach((teamData) => {
      teamData.users.forEach((user) => {
        if (user.id === userId) {
          result.hasApplied = true;
        }
      });

      teamData.administrators.forEach((administrator) => {
        if (administrator.id === userId) {
          result.isAdministrator = true;
        }
      });
    });

    return result;
  }
};

const userService = userServiceFactory();

export default userService;

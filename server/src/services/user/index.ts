import { User, UserCreate } from "@/entities/user";
import { generateAccessToken, generateRefreshToken } from "@/helpers/jwt";
import userRepository from "@/repositories/user";

const userServiceFactory = () => {
  return Object.freeze({
    findById,
    findOrCreate,
    createTokens,
    getPublicUserInfo,
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
};

const userService = userServiceFactory();

export default userService;

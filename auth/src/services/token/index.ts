import { generateAccessToken, generateRefreshToken } from "@/helpers/jwt";
import jwt, { JwtPayload, verify } from "jsonwebtoken";
import tokenRepository from "@/repositories/token";
import { UnauthorizedError } from "@/helpers/errors";
import userService from "../user";

const tokenServiceFactory = () => {
  return Object.freeze({
    generate,
    refreshAccess,
    deleteRefresh,
    saveRefresh,
  });

  async function generate(userId: number) {
    if (!userId) throw new UnauthorizedError("No userId specified");

    const refreshToken = generateRefreshToken(userId);

    await tokenRepository.save(refreshToken);

    return {
      accessToken: generateAccessToken(userId),
      refreshToken,
    };
  }

  async function saveRefresh(refreshToken: string) {
    return tokenRepository.save(refreshToken);
  }

  async function deleteRefresh(refreshToken: string) {
    return tokenRepository.erase(refreshToken);
  }

  async function refreshAccess(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedError("No refresh token provided");
    const { id: userId } = verify(refreshToken, process.env.TOKEN_SECRET!) as {
      id: number;
    };

    const refreshFromDB = await tokenRepository.get(userId);

    if (!refreshFromDB || refreshToken != refreshFromDB)
      throw new UnauthorizedError("No refresh token found in the database");

    const doesUserExist = await userService.findById(userId);
    if (!doesUserExist)
      throw new UnauthorizedError("User not found in the database");

    const newAccessToken = generateAccessToken(doesUserExist.id);

    return newAccessToken;
  }
};

const tokenService = tokenServiceFactory();

export default tokenService;

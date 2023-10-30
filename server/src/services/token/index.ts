import { generateAccessToken, generateRefreshToken } from "@/helpers/jwt";
import jwt, { JwtPayload, verify } from "jsonwebtoken";
import userService from "../user";
import tokenRepository from "@/repositories/token";

const tokenServiceFactory = () => {
  return Object.freeze({
    generate,
    refreshAccess,
    deleteRefresh,
    saveRefresh,
  });

  async function generate(userId: number) {
    if (!userId) throw new Error("Unauthorized");

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
    try {
      const { id: userId } = verify(
        refreshToken,
        process.env.TOKEN_SECRET!
      ) as {
        id: number;
      };

      const refreshFromDB = await tokenRepository.get(userId);

      if (!refreshFromDB || refreshToken != refreshFromDB)
        throw new Error("Unauthorized");

      const doesUserExist = await userService.findById(userId);
      if (!doesUserExist) throw new Error("Unauthorized");

      const newAccessToken = generateAccessToken(doesUserExist.id);

      return newAccessToken;
    } catch (err) {
      throw new Error("Unauthorized");
    }
  }
};

const tokenService = tokenServiceFactory();

export default tokenService;

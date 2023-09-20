import { Admin } from "@/entities/admin";
import { generateAccessToken, generateRefreshToken } from "@/../jwt";
import adminRepository from "@/repositories/admin";

export const createTokens = async (admin: Admin) => {
  const refreshToken = generateRefreshToken(admin.id);

  const saveResult = await adminRepository.updateToken(admin.id, refreshToken);

  return {
    accessToken: saveResult ? generateAccessToken(admin.id) : null,
    refreshToken: saveResult ? refreshToken : null,
  };
};

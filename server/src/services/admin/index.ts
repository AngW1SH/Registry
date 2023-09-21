import { generateAccessToken, generateRefreshToken } from "@/helpers/jwt";
import adminRepository from "@/repositories/admin";
import { Admin } from "@/entities/admin";

const adminServiceFactory = () => {
  return Object.freeze({
    updateAccessToken,
    hashPassword,
    createTokens,
  });

  async function createTokens(admin: Admin) {
    const refreshToken = generateRefreshToken(admin.id);

    const saveResult = await adminRepository.updateToken(
      admin.id,
      refreshToken
    );

    return {
      accessToken: saveResult ? generateAccessToken(admin.id) : null,
      refreshToken: saveResult ? refreshToken : null,
    };
  }

  async function hashPassword(password: string) {
    return adminRepository.hashPassword(password);
  }

  async function updateAccessToken(token: string) {
    const admin = await adminRepository.findByToken(token);

    return admin ? generateAccessToken(admin.id) : null;
  }
};

const adminService = adminServiceFactory();

export default adminService;

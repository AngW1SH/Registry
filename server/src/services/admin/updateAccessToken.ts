import adminRepository from "@/repositories/admin";
import { generateAccessToken } from "@/../jwt/";

export const updateAccessToken = async (token: string) => {
  const admin = await adminRepository.findByToken(token);

  return admin ? generateAccessToken(admin.id) : null;
};

import adminRepository from "@/repositories/admin";

export const hashPassword = async (password: string) => {
  return adminRepository.hashPassword(password);
};

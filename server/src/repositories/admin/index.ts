import { prisma } from "@/../prisma-client";
import bcrypt from "bcryptjs";

const adminRepositoryFactory = () => {
  return Object.freeze({
    findByToken,
    hashPassword,
    updateToken,
  });

  async function findByToken(token: string) {
    const doesAdminExist = await prisma.user.findFirst({
      where: {
        refresh: token,
      },
    });

    return doesAdminExist;
  }

  function hashPassword(password: string) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        return hashedPassword;
      });
    });
  }

  async function updateToken(id: string, token: string) {
    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        refresh: token,
      },
    });

    return result;
  }
};

const adminRepository = adminRepositoryFactory();

export default adminRepository;

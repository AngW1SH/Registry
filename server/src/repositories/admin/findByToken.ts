import { prisma } from "@/../prisma-client";

export const findByToken = async (token: string) => {
  const doesAdminExist = await prisma.user.findFirst({
    where: {
      refresh: token,
    },
  });

  return doesAdminExist;
};

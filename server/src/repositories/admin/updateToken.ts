import { prisma } from "@/../prisma-client";

export const updateToken = async (id: string, token: string) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      refresh: token,
    },
  });

  return result;
};

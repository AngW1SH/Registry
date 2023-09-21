import { prisma } from "@/db/prisma-client";

const projectRepositoryFactory = () => {
  return Object.freeze({
    getActive,
  });

  async function getActive() {
    const now = new Date();

    const projects = await prisma.project.findMany({
      where: {
        dateStart: {
          lte: now,
        },
        dateEnd: {
          gte: now,
        },
        isPublic: true,
      },
    });

    return projects;
  }
};
const projectRepository = projectRepositoryFactory();
export default projectRepository;

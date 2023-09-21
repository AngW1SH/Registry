import { prisma } from "@/db/prisma-client";
import { ProjectWithTags } from "@/entities/project";

const projectRepositoryFactory = () => {
  return Object.freeze({
    getActive,
  });

  async function getActive(): Promise<ProjectWithTags[]> {
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
      select: {
        id: true,
        name: true,
        description: true,
        developerRequirements: true,
        dateStart: true,
        dateEnd: true,
        enrollmentStart: true,
        enrollmentEnd: true,
        supervisor: true,
        isPublic: true,
        tags: {
          select: {
            Tag: true,
          },
        },
      },
    });

    return projects.map((project) => ({
      ...project,
      tags: project.tags.map((tag) => tag.Tag),
    }));
  }
};
const projectRepository = projectRepositoryFactory();
export default projectRepository;

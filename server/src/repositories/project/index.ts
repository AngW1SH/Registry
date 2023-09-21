import { prisma } from "@/db/prisma-client";
import { ProjectWithTags } from "@/entities/project";
import { Tag } from "@/entities/tag";

const projectRepositoryFactory = () => {
  return Object.freeze({
    getActive,
    getNew,
  });

  async function getActive(tagIds?: string[]): Promise<ProjectWithTags[]> {
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
        tags:
          tagIds && tagIds.length
            ? {
                some: {
                  tagId: {
                    in: tagIds,
                  },
                },
              }
            : undefined,
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

  async function getNew(limit?: number): Promise<ProjectWithTags[]> {
    const now = new Date();

    const projects = await prisma.project.findMany({
      take: limit ? limit : undefined,
      orderBy: {
        dateStart: "desc",
      },
      where: {
        dateEnd: {
          gte: now,
        },
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

import { prisma } from "@/db/prisma-client";
import { ProjectFilters, ProjectWithTags } from "@/entities/project";
import { Tag } from "@/entities/tag";
import { generateProjectFilters } from "./utils/generateProjectFilters";
import { checkFilterValidity } from "./utils/checkFilterValidity";

const projectRepositoryFactory = () => {
  return Object.freeze({
    getNew,
    findMany,
  });

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

  async function findMany(
    filters?: ProjectFilters
  ): Promise<ProjectWithTags[]> {
    if (!checkFilterValidity(filters)) return [];

    const projects = await prisma.project.findMany({
      where: filters ? generateProjectFilters(filters) : undefined,
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

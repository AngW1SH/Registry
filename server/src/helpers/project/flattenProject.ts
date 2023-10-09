import { Project, ProjectWithTags } from "@/entities/project";
import { ProjectStrapiPopulated } from "@/entities/project/types/types";
import { Tag } from "@/entities/tag";
import { Team } from "@/entities/team/types/types";
import { User } from "@/entities/user/types/types";
import { flattenTeam } from "@/helpers/team";
import { flattenTag } from "../tag/flattenTag";

export const flattenProjects = (
  projects: ProjectWithTags[]
): { projects: Project[]; tags: Tag[] } => {
  const usedTagIds = new Set();
  const tags = [];

  projects.forEach((project) => {
    project.tags.forEach((projectTag) => {
      if (usedTagIds.has(projectTag.id)) return;

      usedTagIds.add(projectTag.id);
      tags.push(projectTag);
    });
  });

  return {
    projects: projects.map((project) => ({
      ...project,
      tags: project.tags.map((tag) => tag.id),
    })),
    tags: tags,
  };
};

export const flattenProject = (
  project: ProjectStrapiPopulated
): { project: Project; tags: Tag[]; team: Team; users: User[] } => {
  return {
    project: {
      id: project.data.id,
      ...{ ...project.data.attributes, team: undefined },
      teamId: project.data.attributes.team.data.id,
      tags: project.data.attributes.tags.data.map((tag) => tag.id),
    },
    tags: project.data.attributes.tags.data.map((tag) => ({
      id: tag.id,
      name: tag.attributes.name,
    })),
    ...flattenTeam(project.data.attributes.team),
  };
};

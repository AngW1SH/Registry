import { Project, ProjectWithTags } from "@/entities/project";
import { ProjectStrapiPopulated } from "@/entities/project/types/types";
import { Tag } from "@/entities/tag";
import { Team } from "@/entities/team/types/types";
import { User } from "@/entities/user/types/types";
import { flattenTeam } from "@/entities/team";

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
  const { requests, administrators, ...attributes } = project.data.attributes;

  return {
    project: {
      id: project.data.id,
      ...{ ...attributes, team: undefined },
      developerRequirements: project.data.attributes.developerRequirements.map(
        (requirement) => requirement.developerRequirement
      ),
      team: project.data.attributes.team.data.id,
      tags: project.data.attributes.tags.data.map((tag) => tag.id),
      requestCount: requests.data.attributes.count,
    },
    tags: project.data.attributes.tags.data.map((tag) => ({
      id: tag.id,
      name: tag.attributes.name,
    })),
    ...flattenTeam(project.data.attributes.team),
  };
};
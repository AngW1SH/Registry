import { Project, ProjectWithTags } from "@/entities/project";
import { Tag } from "@/entities/tag";

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
  project: ProjectWithTags
): { project: Project; tags: Tag[] } => {
  return {
    project: {
      ...project,
      tags: project.tags.map((tag) => tag.id),
    },
    tags: project.tags,
  };
};

import { Project } from "@/entities/project";
import { Tag } from "@/entities/tag";
import { Team } from "@/entities/team/types/types";
import { User } from "@/entities/user/types/types";
import {
  ProjectStrapiPopulated,
  ProjectWithTagsListStrapi,
} from "../../types/project";
import { getTagFromStrapiDTO } from "../tag";
import { getTeamListFromStrapiDTO } from "../team";
import { ProjectDetailed } from "@/entities/project/types/types";
import { getNamedFileListFromStrapiDTO } from "../components/named-file";

export const getProjectListFromStrapiDTO = (
  projects: ProjectWithTagsListStrapi
): { projects: Project[]; tags: Tag[] } => {
  const usedTagIds = new Set();
  const tags = [];

  projects.data.forEach((project) => {
    project.attributes.tags.data.forEach((projectTag) => {
      if (usedTagIds.has(projectTag.id)) return;

      usedTagIds.add(projectTag.id);
      tags.push(getTagFromStrapiDTO({ data: projectTag }).tag);
    });
  });
  return {
    projects: projects.data.map((project) => ({
      id: project.id,
      ...project.attributes,
      tags: project.attributes.tags.data.map((tag) => tag.id),
      teams: project.attributes.teams.data
        ? project.attributes.teams.data.map((team) => team.id)
        : null,
    })),
    tags: tags,
  };
};

export const getProjectFromStrapiDTO = (
  project: ProjectStrapiPopulated
): { project: ProjectDetailed; tags: Tag[]; teams: Team[]; users: User[] } => {
  const { requests, administrators, ...attributes } = project.data.attributes;

  return {
    project: {
      id: project.data.id,
      ...{ ...attributes, team: undefined, requests: undefined },
      developerRequirements: project.data.attributes.developerRequirements.map(
        (requirement) => requirement.developerRequirement
      ),
      teams: project.data.attributes.teams.data
        ? project.data.attributes.teams.data.map((team) => team.id)
        : null,
      tags: project.data.attributes.tags.data.map((tag) => tag.id),
      requestCount: requests ? requests.data.attributes.count : 0,
      descriptionFiles: getNamedFileListFromStrapiDTO(
        project.data.attributes.descriptionFiles
      ),
      resultFiles: getNamedFileListFromStrapiDTO(
        project.data.attributes.resultFiles
      ),
    },
    tags: project.data.attributes.tags.data.map((tag) => ({
      id: tag.id,
      name: tag.attributes.name,
    })),
    ...getTeamListFromStrapiDTO(project.data.attributes.teams),
  };
};

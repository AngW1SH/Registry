import { Tag } from "@/entities/tag";
import { Team } from "@/entities/team/types/types";
import { User } from "@/entities/user/types/types";
import {
  ProjectListStrapi,
  ProjectReferenceListStrapi,
  ProjectStrapi,
  ProjectStrapiPopulated,
  ProjectWithTagsListStrapi,
} from "../../types/project";
import { getTagFromStrapiDTO } from "../tag";
import { getTeamFromStrapiDTO, getTeamListFromStrapiDTO } from "../team";
import {
  ProjectDTO,
  ProjectDetailed,
  ProjectDetailedDTO,
  ProjectReference,
} from "@/entities/project/types/types";
import { getNamedFileListFromStrapiDTO } from "../components/named-file";
import { Member } from "@/entities/member";
import { TeamListStrapi, TeamStrapiInner } from "../../types/team";

export const getProjectListFromStrapiDTO = (
  projects: ProjectListStrapi
): {
  projects: ProjectDTO[] | null;
  tags: Tag[] | null;
  teams: Team[] | null;
  users: User[] | null;
  members: Member[] | null;
  administrators: User[] | null;
} => {
  if (!projects.data)
    return {
      projects: null,
      tags: null,
      teams: null,
      users: null,
      members: null,
      administrators: null,
    };

  const usedTagIds = new Set();
  const tags: Tag[] = [];

  const usedTeamIds = new Set();
  const teams: Team[] = [];

  const usedMemberIds = new Set();
  const members: Member[] = [];

  const usedUserIds = new Set();
  const users: User[] = [];

  const usedAdministratorIds = new Set();
  const administrators: User[] = [];

  projects.data.forEach((project) => {
    project.attributes.tags.data?.[0]?.attributes?.hasOwnProperty("name") &&
      project.attributes.tags.data.forEach((projectTag) => {
        if (usedTagIds.has(projectTag.id)) return;

        usedTagIds.add(projectTag.id);
        tags.push(getTagFromStrapiDTO({ data: projectTag }).tag);
      });

    project.attributes.teams.data?.[0]?.attributes?.hasOwnProperty("name") &&
      project.attributes.teams.data.forEach((teamStrapi: TeamStrapiInner) => {
        const {
          team,
          users: teamUsers,
          administrators: teamAdmins,
          members: teamMembers,
        } = getTeamFromStrapiDTO({ data: teamStrapi });

        if (team && !usedTeamIds.has(team.id)) {
          usedTeamIds.add(team.id);
          teams.push(team);
        }

        teamUsers &&
          teamUsers.forEach((teamUser) => {
            if (usedUserIds.has(teamUser.id)) return;

            usedUserIds.add(teamUser.id);
            users.push(teamUser);
          });

        teamMembers &&
          teamMembers.forEach((teamMember) => {
            if (usedMemberIds.has(teamMember.id)) return;

            usedMemberIds.add(teamMember.id);
            members.push(teamMember);
          });

        teamAdmins &&
          teamAdmins.forEach((teamAdmin) => {
            if (usedAdministratorIds.has(teamAdmin.id)) return;

            usedAdministratorIds.add(teamAdmin.id);
            administrators.push(teamAdmin);
          });
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
    users,
    administrators,
    members,
    teams,
  };
};

export const getProjectFromStrapiDTO = (
  project: ProjectStrapi
): {
  project: ProjectDetailedDTO | null;
  tags: Tag[] | null;
  teams: Team[] | null;
  users: User[] | null;
  members: Member[] | null;
  administrators: User[] | null;
} => {
  if (!project.data)
    return {
      project: null,
      tags: null,
      teams: null,
      users: null,
      members: null,
      administrators: null,
    };

  const { requests, ...attributes } = project.data.attributes;

  return {
    project: {
      id: project.data.id,
      ...{ ...attributes, team: undefined, requests: undefined },
      developerRequirements:
        project.data.attributes.developerRequirements?.map(
          (requirement) => requirement.developerRequirement
        ) || null,
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
    ...(project.data.attributes.teams.data?.[0].hasOwnProperty("attributes") &&
      getTeamListFromStrapiDTO(
        project.data.attributes.teams as TeamListStrapi
      )),
    ...((!project.data.attributes.teams.data.length ||
      !project.data.attributes.teams.data[0].hasOwnProperty("attributes")) && {
      teams: null,
      members: null,
      users: null,
      administrators: null,
    }),
  };
};

export const getProjectReferenceListFromStrapiDTO = (
  projects: ProjectReferenceListStrapi
): ProjectReference[] => {
  return projects.data.map((project) => ({
    id: project.id,
    name: project.attributes.name,
  }));
};

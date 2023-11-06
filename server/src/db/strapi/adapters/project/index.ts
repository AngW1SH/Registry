import { Tag } from "@/entities/tag";
import { Team } from "@/entities/team/types/types";
import { User } from "@/entities/user/types/types";
import {
  ProjectListStrapi,
  ProjectReferenceListStrapi,
  ProjectStrapi,
} from "../../types/project";
import { getTagFromStrapiDTO } from "../tag";
import { getTeamFromStrapiDTO, getTeamListFromStrapiDTO } from "../team";
import {
  ProjectDTO,
  ProjectDetailedDTO,
  ProjectReference,
} from "@/entities/project/types/types";
import { getNamedFileListFromStrapiDTO } from "../components/named-file";
import { Member } from "@/entities/member";
import { TeamListStrapi, TeamStrapi, TeamStrapiInner } from "../../types/team";
import { TagStrapi } from "../../types/tag";
import { Request } from "@/entities/request";

export const getProjectListFromStrapiDTO = (
  projects: ProjectListStrapi
): {
  projects: ProjectDTO[] | null;
  tags: Tag[] | null;
  teams: Team[] | null;
  users: User[] | null;
  members: Member[] | null;
  administrators: User[] | null;
  requests: Request[] | null;
} => {
  if (!projects.data)
    return {
      projects: null,
      tags: null,
      teams: null,
      users: null,
      members: null,
      administrators: null,
      requests: null,
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

  const usedRequestIds = new Set();
  const requests: Request[] = [];

  projects.data.forEach((project) => {
    project.attributes.tags?.data?.[0]?.attributes?.hasOwnProperty("name") &&
      project.attributes.tags.data.forEach((projectTag) => {
        if (usedTagIds.has(projectTag.id)) return;

        usedTagIds.add(projectTag.id);
        tags.push(getTagFromStrapiDTO({ data: projectTag } as TagStrapi).tag);
      });

    project.attributes.teams?.data?.[0]?.attributes?.hasOwnProperty("name") &&
      project.attributes.teams.data.forEach((teamStrapi) => {
        const {
          team,
          users: teamUsers,
          administrators: teamAdmins,
          members: teamMembers,
          requests: teamRequests,
        } = getTeamFromStrapiDTO({ data: teamStrapi } as TeamStrapi);

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

        teamRequests &&
          teamRequests.forEach((teamRequest) => {
            if (usedRequestIds.has(teamRequest.id)) return;

            usedRequestIds.add(teamRequest.id);
            requests.push(teamRequest);
          });
      });
  });

  return {
    projects: projects.data.map((project) => ({
      id: project.id,
      ...project.attributes,
      tags: project.attributes.tags?.data.map((tag) => tag.id) || [],
      teams: project.attributes.teams?.data
        ? project.attributes.teams.data.map((team) => team.id)
        : [],
    })),
    tags: tags,
    users,
    administrators,
    members,
    teams,
    requests,
  };
};

export const getProjectFromStrapiDTO = (
  project: ProjectStrapi,
  options?: {
    includeAdmin?: boolean;
  }
): {
  project: ProjectDetailedDTO | null;
  tags: Tag[];
  teams: Team[];
  users: User[];
  members: Member[];
  administrators: User[];
} => {
  if (!project.data)
    return {
      project: null,
      tags: [],
      teams: [],
      users: [],
      members: [],
      administrators: [],
    };

  const { requests, ...attributes } = project.data.attributes;

  const tags =
    project.data.attributes.tags?.data?.[0]?.attributes?.hasOwnProperty("name")
      ? project.data.attributes.tags.data.map(
          (projectTag) =>
            getTagFromStrapiDTO({ data: projectTag } as TagStrapi).tag
        )
      : [];

  return {
    project: {
      id: project.data.id,
      ...{ ...attributes, team: undefined, requests: undefined },
      developerRequirements:
        project.data.attributes.developerRequirements?.map(
          (requirement) => requirement.developerRequirement
        ) || [],
      teams: project.data.attributes.teams?.data
        ? project.data.attributes.teams.data.map((team) => team.id)
        : [],
      tags: project.data.attributes.tags?.data.map((tag) => tag.id) || [],
      requestCount: requests ? requests.data.attributes.count : 0,
      descriptionFiles: project.data.attributes.descriptionFiles
        ? getNamedFileListFromStrapiDTO(
            project.data.attributes.descriptionFiles
          )
        : [],
      resultFiles: project.data.attributes.resultFiles
        ? getNamedFileListFromStrapiDTO(project.data.attributes.resultFiles)
        : [],
    },
    tags,
    ...(project.data.attributes.teams?.data?.[0]?.attributes?.hasOwnProperty(
      "name"
    )
      ? getTeamListFromStrapiDTO(
          project.data.attributes.teams as TeamListStrapi,
          options
        )
      : {
          teams: [],
          members: [],
          users: [],
          administrators: [],
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

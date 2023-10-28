import { Team } from "@/entities/team";
import { TeamListStrapi, TeamStrapi } from "../../types/team";
import type { User } from "@/entities/user";
import { TeamWithAdministrators } from "@/entities/team/types/types";
import { Member } from "@/entities/member";
import { getMemberListFromStrapiDTO } from "../member";
import { MemberListStrapi } from "../../types/member";
import { Project } from "@/entities/project";
import { getRequestListFromStrapiDTO } from "../request";
import { RequestListStrapi } from "../../types/request";
import { Request } from "@/entities/request";
import { ProjectDTO } from "@/entities/project/types/types";

export const getTeamFromStrapiDTO = (
  team: TeamStrapi,
  options?: {
    includeAdmin?: boolean;
  }
): {
  team: Team | TeamWithAdministrators | null;
  users: User[] | null;
  members: Member[] | null;
  administrators: User[] | null;
  projects: ProjectDTO[] | null;
  requests: Request[] | null;
} => {
  if (!team.data)
    return {
      team: null,
      users: null,
      members: null,
      administrators: null,
      projects: null,
      requests: null,
    };

  const { members, users, administrators } =
    team.data.attributes.members?.data?.[0]?.attributes?.hasOwnProperty("name")
      ? getMemberListFromStrapiDTO(
          team.data.attributes.members as MemberListStrapi,
          {
            team,
            includeAdmin: options?.includeAdmin,
          }
        )
      : { members: [], users: [], administrators: [] };

  const { requests, projects } =
    team.data.attributes.requests &&
    team.data.attributes.requests.data?.[0]?.attributes?.hasOwnProperty("name")
      ? getRequestListFromStrapiDTO(
          team.data.attributes.requests as RequestListStrapi,
          options
        )
      : { requests: null, projects: null };

  return {
    team: {
      id: team.data.id,
      name: team.data.attributes.name,
      members: members.map((member) => member.id),
      project: team.data.attributes.project?.data
        ? team.data.attributes.project.data.id
        : null,
      ...(options?.includeAdmin && {
        administrators: administrators.map((admin) => admin.id),
      }),
      requests: !team.data.attributes.requests
        ? undefined
        : team.data.attributes.requests.data.map((request) => request.id),
    },
    users,
    members,
    administrators,
    requests,
    projects,
  };
};

export const getTeamListFromStrapiDTO = (
  teamsStrapi: TeamListStrapi,
  options?: {
    includeAdmin?: boolean;
  }
): {
  teams: Team[] | TeamWithAdministrators[];
  members: Member[];
  users: User[];
  administrators: User[];
  requests: Request[];
  projects: ProjectDTO[];
} => {
  if (!teamsStrapi.data)
    return {
      teams: [],
      users: [],
      members: [],
      administrators: [],
      requests: [],
      projects: [],
    };

  const usedTeamIds = new Set();
  const teams: Team[] = [];

  const usedUserIds = new Set();
  const users: User[] = [];

  const usedMemberIds = new Set();
  const members: Member[] = [];

  const usedAdministratorIds = new Set();
  const administrators: User[] = [];

  const usedRequestIds = new Set();
  const requests: Request[] = [];

  const usedProjectIds = new Set();
  const projects: ProjectDTO[] = [];

  teamsStrapi.data.forEach((teamStrapi) => {
    const {
      team,
      members: teamMembers,
      users: teamUsers,
      administrators: teamAdministrators,
      requests: teamRequests,
      projects: teamProjects,
    } = getTeamFromStrapiDTO({ data: teamStrapi }, options);

    team && !usedTeamIds.has(team.id) && teams.push(team);

    teamMembers &&
      teamMembers.forEach((member) => {
        if (!usedMemberIds.has(member.id)) {
          members.push(member);
        }
      });

    teamUsers &&
      teamUsers.forEach((user) => {
        if (!usedUserIds.has(user.id)) {
          users.push(user);
        }
      });

    teamAdministrators &&
      teamAdministrators.forEach((admin) => {
        if (!usedAdministratorIds.has(admin.id)) {
          administrators.push(admin);
        }
      });

    teamRequests &&
      teamRequests.forEach((request) => {
        if (!usedRequestIds.has(request.id)) {
          requests.push(request);
        }
      });

    teamProjects &&
      teamProjects.forEach((project) => {
        if (!usedProjectIds.has(project.id)) {
          projects.push(project);
        }
      });
  });

  return {
    teams,
    users,
    members,
    administrators,
    requests,
    projects,
  };
};

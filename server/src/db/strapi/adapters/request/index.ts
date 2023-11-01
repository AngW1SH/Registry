import { Request } from "@/entities/request";
import { RequestListStrapi } from "../../types/request";
import { getTeamFromStrapiDTO } from "../team";
import { Team } from "@/entities/team";
import { Member } from "@/entities/member";
import { User } from "@/entities/user";
import { TeamStrapi } from "../../types/team";
import { TeamWithAdministrators } from "@/entities/team/types/types";
import { getProjectFromStrapiDTO } from "../project";
import { ProjectStrapi } from "../../types/project";
import { ProjectDTO } from "@/entities/project/types/types";
import { getNamedFileListFromStrapiDTO } from "../components/named-file";
import { mimeToDisplayType } from "@/helpers/mime/mimeToDisplayType";

export const getRequestListFromStrapiDTO = (
  requests: RequestListStrapi,
  options?: {
    includeAdmin?: boolean;
  }
): {
  requests: Request[] | null;
  teams: Team[] | TeamWithAdministrators[] | null;
  users: User[] | null;
  administrators: User[] | null;
  members: Member[] | null;
  projects: ProjectDTO[] | null;
} => {
  const usedTeamIds = new Set();
  const teams: Team[] = [];

  const usedMemberIds = new Set();
  const members: Member[] = [];

  const usedUserIds = new Set();
  const users: User[] = [];

  const usedAdministratorIds = new Set();
  const administrators: User[] = [];

  const usedProjectIds = new Set();
  const projects: ProjectDTO[] = [];

  requests.data?.[0]?.attributes?.hasOwnProperty("name") &&
    requests.data.forEach((request) => {
      if (
        request.attributes.project &&
        request.attributes.project.data?.attributes.hasOwnProperty("name")
      ) {
        const { project } = getProjectFromStrapiDTO(
          request.attributes.project as ProjectStrapi
        );

        if (project && !usedProjectIds.has(project.id)) {
          projects.push(project);
        }
      }

      if (!request.attributes.team) return;
      const {
        team,
        users: teamUsers,
        administrators: teamAdmins,
        members: teamMembers,
      } = request.attributes.team &&
      request.attributes.team.data?.attributes.hasOwnProperty("name")
        ? getTeamFromStrapiDTO(request.attributes.team as TeamStrapi, options)
        : {
            team: null,
            users: [],
            administrators: [],
            members: [],
          };

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

  return {
    requests: requests.data.map((request) => ({
      id: request.id,
      team: request.attributes.team?.data
        ? request.attributes.team.data.id
        : null,
      project: request.attributes.project?.data
        ? request.attributes.project.data.id
        : null,
      files:
        request.attributes.files?.data.map((file) => ({
          id: file.id,
          name: file.attributes.name || "",
          url: file.attributes.url || "",
          type: Object.keys(mimeToDisplayType).includes(file.attributes.mime!)
            ? (mimeToDisplayType[
                file.attributes.mime as keyof typeof mimeToDisplayType
              ] as string)
            : "FILE",
          size: parseInt("" + file.attributes.size) + "Кб",
        })) || [],
    })),
    administrators,
    users,
    teams,
    members,
    projects,
  };
};

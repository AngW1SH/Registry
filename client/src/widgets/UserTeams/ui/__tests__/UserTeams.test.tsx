import { staticProfileTeamHiring, useProfileQuery } from "@/composites/Profile";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import UserTeams from "../UserTeams";
import {
  formatNameShort,
  getUsersByUserIds,
  staticUsers,
  useAuthQuery,
} from "@/entities/User";
import { staticTeamsExtended } from "@/entities/Team";
import { getMembersByMemberIds, staticMembers } from "@/entities/Member";
import { getProjectsByProjectIds, staticProjects } from "@/entities/Project";
import { getRequestsByRequestIds, staticRequests } from "@/entities/Request";

jest.mock("@/entities/User", () => {
  const original = jest.requireActual("@/entities/User");

  return {
    ...original,
    useAuthQuery: jest.fn(),
  };
});

jest.mock("@/composites/Profile", () => {
  const original = jest.requireActual("@/composites/Profile");

  return {
    ...original,
    useProfileQuery: jest.fn(),
  };
});

describe("UserTeams widget UI", () => {
  describe("User logged in", () => {
    describe("User has no teams", () => {
      beforeAll(() => {
        jest.clearAllMocks();
        (useAuthQuery as jest.Mock).mockReturnValue({ data: staticUsers[0] });
        (useProfileQuery as jest.Mock).mockReturnValue({
          data: {
            ...staticProfileTeamHiring,
            teams: [],
            user: {
              ...staticProfileTeamHiring.user,
              teams: [],
            },
          },
        });
      });
      it("should inform the user that they have no active teams", () => {
        const { getByText } = render(<UserTeams />);

        const notification = getByText(/У вас пока нет активных команд/i);
        expect(notification).toBeVisible();
      });
    });

    describe("User has at least one team", () => {
      beforeAll(() => {
        jest.clearAllMocks();
        (useAuthQuery as jest.Mock).mockReturnValue({ data: staticUsers[0] });
        (useProfileQuery as jest.Mock).mockReturnValue({
          data: {
            ...staticProfileTeamHiring,
            teams: staticTeamsExtended,
            projects: staticProjects,
            requests: staticRequests,
            user: {
              ...staticProfileTeamHiring.user,
              teams: [staticTeamsExtended[0].id, staticTeamsExtended[1].id],
            },
          },
        });
      });

      it("should render the users for each team", () => {
        const { getAllByText } = render(<UserTeams />);

        [staticTeamsExtended[0], staticTeamsExtended[1]].forEach((team) => {
          const members = getMembersByMemberIds(team.members, staticMembers);
          const teamUsers = getUsersByUserIds(
            members.map((member) => member.user),
            staticUsers,
          );

          teamUsers.forEach((user) => {
            const userNameElement = getAllByText(formatNameShort(user.name));
            expect(userNameElement.length).toBeGreaterThan(0);
          });
        });
      });

      it("should render the projects for each team", () => {
        const { getAllByText } = render(<UserTeams />);

        const teams = [staticTeamsExtended[0], staticTeamsExtended[1]];

        const projects = getProjectsByProjectIds(
          teams.map((team) => team.project!).filter((project) => project),
          staticProjects,
        );

        projects.forEach((project) => {
          const elements = getAllByText(project.name);
          expect(elements.length).toBeGreaterThan(0);
        });
      });

      it("should render the requests for each team", () => {
        const { getAllByText } = render(<UserTeams />);

        const teams = [staticTeamsExtended[0], staticTeamsExtended[1]];

        const requestIds = teams.reduce(
          (acc, cur) =>
            cur.requests && !cur.project ? [...acc, ...cur.requests] : acc,
          [] as number[],
        );
        const requests = getRequestsByRequestIds(requestIds, staticRequests);

        const projectIds = requests.reduce(
          (acc, cur) => (cur.project ? [...acc, cur.project] : acc),
          [] as number[],
        );
        const projects = getProjectsByProjectIds(projectIds, staticProjects);

        projects.forEach((project) => {
          const elements = getAllByText(project.name);
          expect(elements.length).toBeGreaterThan(0);
        });
      });

      it("should label teamleads", () => {
        (useProfileQuery as jest.Mock).mockReturnValue({
          data: {
            ...staticProfileTeamHiring,
            teams: [
              {
                ...staticTeamsExtended[0],
                members: [
                  staticMembers[0].id,
                  staticMembers[1].id,
                  staticMembers[2].id,
                ],
              },
            ],
            members: [
              {
                ...staticMembers[0],
                isAdministrator: true,
              },
              {
                ...staticMembers[1],
                isAdministrator: false,
              },
              {
                ...staticMembers[2],
                isAdministrator: true,
              },
            ],
            user: {
              ...staticProfileTeamHiring.user,
              teams: [staticTeamsExtended[0].id],
            },
          },
        });

        const { getAllByText } = render(<UserTeams />);

        const teamleadLabels = getAllByText(/Представитель команды/i);
        expect(teamleadLabels.length).toBe(2);
      });
    });
  });
  describe("User not logged in", () => {
    beforeAll(() => {
      jest.clearAllMocks();

      (useAuthQuery as jest.Mock).mockReturnValue({
        data: null,
      });
      (useProfileQuery as jest.Mock).mockReturnValue({
        data: null,
      });
    });
    it("shouldn't render the block", () => {
      const { queryByText } = render(<UserTeams />);

      const title = queryByText(/Команды/i);
      expect(title).not.toBeInTheDocument();
    });
  });
});

import {
  formatNameShort,
  getUsersByUserIds,
  staticUsers,
  useAuthQuery,
} from "@/entities/User";
import "@testing-library/jest-dom";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import ProjectStatus from "../ProjectStatus";
import {
  staticProjectSingleCompleted,
  staticProjectSingleNotStarted,
  staticProjectSingleOngoing,
} from "@/entities/Project";
import { useProjectStatusDataQuery } from "../../model/useProjectStatusDataQuery";
import { staticTeams } from "@/entities/Team";
import { getMembersByMemberIds, staticMembers } from "@/entities/Member";

jest.mock("@/entities/User", () => {
  const original = jest.requireActual("@/entities/User");

  return {
    ...original,
    useAuthQuery: jest.fn(),
  };
});

jest.mock("../../model/useProjectStatusDataQuery", () => {
  return {
    useProjectStatusDataQuery: jest.fn(),
  };
});

jest.mock("@/features/SendRequest/model/useRequestMutation", () => {
  return {
    useRequestMutation: jest.fn(() => ({
      mutate: jest.fn(),
      status: "idle",
    })),
  };
});

describe("ProjectStatus widget UI", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("01 Sep 2023 18:30 GMT").getTime());
  });
  describe("Project has available team slots, hasn't started yet", () => {
    describe("User authorized", () => {
      beforeAll(() => {
        (useAuthQuery as jest.Mock).mockReturnValue({
          data: staticUsers[0],
          isLoading: false,
        });
        (useProjectStatusDataQuery as jest.Mock).mockReturnValue({
          data: {
            user: { assignableTeams: [], hasTeamApplied: false },
            teams: [],
          },
          isLoading: false,
        });
      });

      it("should display the number of available team slots", () => {
        const { getByText } = render(
          <ProjectStatus
            project={staticProjectSingleNotStarted}
            users={staticUsers}
          />,
        );

        const notification = getByText(/число вакансий/i);
        expect(notification).toBeVisible();
      });

      it("should display if the user doesn't have any teams applied for the project", () => {
        const { getByText } = render(
          <ProjectStatus
            project={staticProjectSingleNotStarted}
            users={staticUsers}
          />,
        );

        const notification = getByText(/не состоите ни в одной команде/i);
        expect(notification).toBeVisible();
      });

      it("should display if the user has at least one team applied for the project", () => {
        (useProjectStatusDataQuery as jest.Mock).mockReturnValue({
          data: {
            user: { assignableTeams: [], hasTeamApplied: true },
            teams: [],
          },
          isLoading: false,
        });
        const { getByText } = render(
          <ProjectStatus
            project={staticProjectSingleNotStarted}
            users={staticUsers}
          />,
        );

        const notification = getByText(/состоите в команде, подавшей/i);
        expect(notification).toBeVisible();
      });

      describe("user can send a request", () => {
        beforeAll(() => {
          (useProjectStatusDataQuery as jest.Mock).mockReturnValue({
            data: {
              user: { assignableTeams: [4], hasTeamApplied: false },
              teams: staticTeams,
            },
            isLoading: false,
          });
        });
        it("should display if the user can send a request", () => {
          const { getByText } = render(
            <ProjectStatus
              project={staticProjectSingleNotStarted}
              users={staticUsers}
            />,
          );

          const button = getByText(/подать заявку/i);
          expect(button).toBeVisible();
        });

        it("should render a file input", () => {
          const { getByText } = render(
            <ProjectStatus
              project={staticProjectSingleNotStarted}
              users={staticUsers}
            />,
          );

          const label = getByText(/презентация команды/i);
          expect(label).toBeVisible();
        });

        it("should render a team select input if the user can assign multiple teams", () => {
          (useProjectStatusDataQuery as jest.Mock).mockReturnValueOnce({
            data: {
              user: { assignableTeams: [4, 5], hasTeamApplied: false },
              teams: staticTeams,
            },
            isLoading: false,
          });

          const { getByPlaceholderText } = render(
            <ProjectStatus
              project={staticProjectSingleNotStarted}
              users={staticUsers}
            />,
          );

          const label = getByPlaceholderText(/команда/i);
          expect(label).toBeVisible();
        });
      });
    });
    describe("User not authorized", () => {
      beforeAll(() => {
        (useAuthQuery as jest.Mock).mockReturnValue({ data: null });
        (useProjectStatusDataQuery as jest.Mock).mockReturnValue({
          data: null,
        });
      });

      it("should inform the user to log in", () => {
        const { getByText } = render(
          <ProjectStatus
            project={staticProjectSingleNotStarted}
            users={staticUsers}
          />,
        );

        const warning = getByText(/необходимо авторизоваться/i);

        expect(warning).toBeVisible();
      });
    });
  });

  describe("Project is being worked on", () => {
    beforeAll(() => {
      (useAuthQuery as jest.Mock).mockReturnValue({
        data: null,
        isLoading: false,
      });
      (useProjectStatusDataQuery as jest.Mock).mockReturnValue({
        data: null,
        isLoading: false,
      });
    });
    it("should render the active team member names if only one is required by the project", () => {
      const team = staticTeams[0];

      const { getByText } = render(
        <ProjectStatus
          project={{
            ...staticProjectSingleOngoing,
            teams: [team.id],
            teamLimit: 1,
          }}
          users={staticUsers}
        />,
      );

      const members = getMembersByMemberIds(team.members, staticMembers);

      members.forEach((member) => {
        const memberUser = staticUsers.find((user) => user.id == member.user);
        expect(memberUser).toBeDefined();

        if (memberUser) {
          const name = getByText(new RegExp(formatNameShort(memberUser.name)));
          expect(name).toBeVisible();
        }
      });
    });

    it("should render an invitation to see teams info if there are multiple teams assigned", () => {
      const team1 = staticTeams[0];
      const team2 = staticTeams[1];
      const { getByText } = render(
        <ProjectStatus
          project={{
            ...staticProjectSingleOngoing,
            teams: [team1.id, team2.id],
            teamLimit: 2,
          }}
          users={staticUsers}
        />,
      );

      const invitation = getByText(/ознакомиться с командами/i);
      expect(invitation).toBeVisible();
    });
  });

  describe("Project is completed", () => {
    it("should tell the user that the project is completed", () => {
      const { getByText } = render(
        <ProjectStatus
          project={staticProjectSingleCompleted}
          users={staticUsers}
        />,
      );

      const notification = getByText(
        /ознакомиться с ходом работы и рельзутатами/i,
      );
      expect(notification).toBeVisible();
    });
  });
});

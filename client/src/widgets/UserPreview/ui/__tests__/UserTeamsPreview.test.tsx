import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import UserTeamsPreview from "../UserTeamsPreview";
import {
  staticProfileTeamAssigned,
  useProfileQuery,
} from "@/composites/Profile";
import { staticTeams, staticTeamsExtended } from "@/entities/Team";
import {
  formatNameShort,
  getUsersByUserIds,
  staticUsers,
} from "@/entities/User";
import { getMembersByMemberIds, staticMembers } from "@/entities/Member";

jest.mock("@/composites/Profile", () => {
  const original = jest.requireActual("@/composites/Profile");

  return {
    ...original,
    useProfileQuery: jest.fn(),
  };
});

describe("UserTeamsPreview widget UI", () => {
  describe("User logged in", () => {
    beforeAll(() => {
      (useProfileQuery as jest.Mock).mockReturnValue({
        data: { ...staticProfileTeamAssigned, teams: staticTeamsExtended },
      });
    });
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should render the block", () => {
      const { getByText } = render(<UserTeamsPreview />);

      // The capital first letter is required to not get multiple matches
      const title = getByText(/Команды/);
      expect(title).toBeInTheDocument();
    });

    describe("User doesn't have any team", () => {
      it("should inform the user that they have no team assigned", () => {
        (useProfileQuery as jest.Mock).mockReturnValue({
          data: {
            ...staticProfileTeamAssigned,
            teams: [staticTeamsExtended[0]],
            user: {
              ...staticProfileTeamAssigned.user,
              teams: [],
            },
          },
        });

        const { getByText } = render(<UserTeamsPreview />);

        const notification = getByText(/Команда пока не назначена/i);
        expect(notification).toBeVisible();
      });
    });
    describe("User has exactly one team", () => {
      it("should render team members", () => {
        (useProfileQuery as jest.Mock).mockReturnValue({
          data: {
            ...staticProfileTeamAssigned,
            teams: [staticTeamsExtended[0]],
            user: {
              ...staticProfileTeamAssigned.user,
              teams: [staticTeamsExtended[0].id],
            },
          },
        });

        const { getByText } = render(<UserTeamsPreview />);

        const members = getMembersByMemberIds(
          staticTeamsExtended[0].members,
          staticMembers,
        );
        const teamUsers = getUsersByUserIds(
          members.map((member) => member.user),
          staticUsers,
        );

        teamUsers.forEach((user) => {
          const element = getByText(formatNameShort(user.name));

          expect(element).toBeVisible();
        });
      });

      it("should inform if the user is a teamlead", () => {
        (useProfileQuery as jest.Mock).mockReturnValue({
          data: {
            ...staticProfileTeamAssigned,
            teams: [staticTeamsExtended[0]],
            user: {
              ...staticProfileTeamAssigned.user,
              administratedTeams: [staticTeamsExtended[0].id],
            },
          },
        });

        const { getByText } = render(<UserTeamsPreview />);
        const notification = getByText(/Вы являетесь представителем команды/i);
        expect(notification).toBeVisible();
      });
    });

    describe("User has many teams", () => {
      it("should render the team count", () => {
        (useProfileQuery as jest.Mock).mockReturnValue({
          data: {
            ...staticProfileTeamAssigned,
            teams: [staticTeamsExtended[0], staticTeamsExtended[1]],
            user: {
              ...staticProfileTeamAssigned.user,
              teams: [staticTeamsExtended[0].id, staticTeamsExtended[1].id],
              administratedTeams: [],
            },
          },
        });

        const { getByText } = render(<UserTeamsPreview />);

        const heading = getByText(/где Вы являетесь участником/i);
        expect(heading).toBeInTheDocument();

        const count = getByText(/2/);
        expect(count).toBeInTheDocument();
      });
      it("should render administrated teams count", () => {
        (useProfileQuery as jest.Mock).mockReturnValue({
          data: {
            ...staticProfileTeamAssigned,
            teams: [
              staticTeamsExtended[0],
              staticTeamsExtended[1],
              staticTeamsExtended[2],
            ],
            user: {
              ...staticProfileTeamAssigned.user,
              administratedTeams: [
                staticTeamsExtended[0].id,
                staticTeamsExtended[1].id,
                staticTeamsExtended[2].id,
              ],
              teams: [staticTeamsExtended[0].id, staticTeamsExtended[1].id],
            },
          },
        });

        const { getByText } = render(<UserTeamsPreview />);

        const heading = getByText(/где Вы являетесь представителем/i);
        expect(heading).toBeVisible();

        const count = getByText(/2/);
        expect(count).toBeVisible();
      });
    });
  });
});

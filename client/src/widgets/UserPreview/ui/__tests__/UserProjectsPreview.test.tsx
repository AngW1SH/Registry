import {
  staticProfileTeamAssigned,
  useProfileQuery,
} from "@/composites/Profile";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import UserProjectsPreview from "../UserProjectsPreview";
import { staticTeams, staticTeamsExtended } from "@/entities/Team";
import { staticProjects } from "@/entities/Project";

jest.mock("@/composites/Profile", () => {
  const original = jest.requireActual("@/composites/Profile");

  return {
    ...original,
    useProfileQuery: jest.fn(),
  };
});

describe("UserProjectsPreview widget UI", () => {
  describe("User logged in", () => {
    describe("No active projects", () => {
      beforeAll(() => {
        jest.clearAllMocks();
        (useProfileQuery as jest.Mock).mockReturnValue({
          data: {
            ...staticProfileTeamAssigned,
            projects: [],
            teams: [{ ...staticTeamsExtended[0], project: undefined }],
            user: {
              teams: [staticTeamsExtended[0].id],
            },
          },
        });
      });
      it("should inform the user that they have no active projects", () => {
        const { getByText } = render(<UserProjectsPreview />);

        const notification = getByText(/Пока нет проектов/i);
        expect(notification).toBeVisible();
      });
    });

    describe("Exactly one active project", () => {
      beforeAll(() => {
        jest.clearAllMocks();
        (useProfileQuery as jest.Mock).mockReturnValue({
          data: {
            ...staticProfileTeamAssigned,
            projects: [staticProjects[0]],
            teams: [
              { ...staticTeamsExtended[0], project: staticProjects[0].id },
            ],
            user: {
              teams: [staticTeamsExtended[0].id],
            },
          },
        });
      });

      it("should render the project's card", () => {
        const { getByText } = render(<UserProjectsPreview />);

        const projectName = getByText(staticProjects[0].name);
        expect(projectName).toBeInTheDocument();
      });

      it("shouldn't render the 'show more' button", () => {
        const { queryByText } = render(<UserProjectsPreview />);

        const showMore = queryByText(/Показать ещё/i);
        expect(showMore).not.toBeInTheDocument();
      });
    });

    describe("More than one active project", () => {
      beforeAll(() => {
        jest.clearAllMocks();
        (useProfileQuery as jest.Mock).mockReturnValue({
          data: {
            ...staticProfileTeamAssigned,
            projects: [staticProjects[0], staticProjects[1]],
            teams: [
              { ...staticTeamsExtended[0], project: staticProjects[0].id },
              { ...staticTeamsExtended[1], project: staticProjects[1].id },
            ],
            user: {
              teams: [staticTeamsExtended[0].id, staticTeamsExtended[1].id],
            },
          },
        });
      });

      it("should render the first project's card", () => {
        const { getByText } = render(<UserProjectsPreview />);

        const projectName = getByText(staticProjects[0].name);
        expect(projectName).toBeInTheDocument();
      });

      it("should render the 'show more' button", () => {
        const { getByText } = render(<UserProjectsPreview />);

        const showMore = getByText(/Показать ещё/i);
        expect(showMore).toBeVisible();
      });
    });
  });
  describe("User not logged in", () => {
    beforeAll(() => {
      jest.clearAllMocks();
      (useProfileQuery as jest.Mock).mockReturnValue({ data: null });
    });
    it("shouldn't render the block", () => {
      const { queryByText } = render(<UserProjectsPreview />);

      const title = queryByText(/Проекты/i);
      expect(title).not.toBeInTheDocument();
    });
  });
});

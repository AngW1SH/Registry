import {
  staticProfileTeamAssigned,
  staticProfileTeamHiring,
  useProfileQuery,
} from "@/composites/Profile";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { before } from "node:test";
import UserRequestsPreview from "../UserRequestsPreview";
import { staticRequests } from "@/entities/Request";
import { staticTeams } from "@/entities/Team";

jest.mock("@/composites/Profile", () => {
  const original = jest.requireActual("@/composites/Profile");

  return {
    ...original,
    useProfileQuery: jest.fn(),
  };
});
describe("UserRequestsPreview widget UI", () => {
  describe("User logged in", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      (useProfileQuery as jest.Mock).mockReturnValue({
        data: {
          ...staticProfileTeamHiring,
          requests: [staticRequests[0], staticRequests[1]],
        },
      });
    });
    it("should render the block", () => {
      const { getByText } = render(<UserRequestsPreview />);

      const title = getByText(/Заявки на проекты/i);
      expect(title).toBeVisible();
    });

    it("should render the number of requests sent by the user's teams", () => {
      const { getByText } = render(<UserRequestsPreview />);

      const heading = getByText(/подано заявок/i);
      expect(heading).toBeVisible();

      const count = getByText(/2/);
      expect(count).toBeVisible();
    });

    it("should render a redirect button if the user has at least one administrated team", () => {
      (useProfileQuery as jest.Mock).mockReturnValue({
        data: {
          ...staticProfileTeamHiring,
          requests: [staticRequests[0], staticRequests[1]],
          user: {
            administratedTeams: [staticTeams[0].id],
          },
        },
      });

      const { getByText } = render(<UserRequestsPreview />);

      const button = getByText(/Управление заявками/i);
      expect(button).toBeVisible();
    });
  });
  describe("User not logged in", () => {
    beforeAll(() => {
      (useProfileQuery as jest.Mock).mockReturnValue({ data: null });
    });
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("shouldn't render the block", () => {
      const { queryByText } = render(<UserRequestsPreview />);

      const title = queryByText(/Заявки на проекты/i);
      expect(title).not.toBeInTheDocument();
    });
  });
});

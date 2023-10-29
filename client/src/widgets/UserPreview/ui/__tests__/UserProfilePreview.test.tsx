import { staticUsers, useAuthQuery } from "@/entities/User";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import UserProfilePreview from "../UserProfilePreview";

jest.mock("@/entities/User", () => {
  const original = jest.requireActual("@/entities/User");
  return {
    ...original,
    useAuthQuery: jest.fn(),
  };
});

describe("UserProfilePreview widget", () => {
  describe("User logged in", () => {
    beforeAll(() => {
      (useAuthQuery as jest.Mock).mockReturnValue({ data: staticUsers[0] });
    });
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should display the contents", () => {
      const { getByText } = render(<UserProfilePreview />);

      const title = getByText(/Личные данные/i);
      expect(title).toBeInTheDocument();
    });
    it("should display the user's email", () => {
      const { getByText } = render(<UserProfilePreview />);

      const email = getByText(staticUsers[0].email);
      expect(email).toBeInTheDocument();
    });
  });

  describe("User not logged in", () => {
    beforeAll(() => {
      (useAuthQuery as jest.Mock).mockReturnValue({ data: null });
    });
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("shouldn't display the block", () => {
      const { queryByText } = render(<UserProfilePreview />);

      const title = queryByText(/Личные данные/i);
      expect(title).not.toBeInTheDocument();
    });
  });
});

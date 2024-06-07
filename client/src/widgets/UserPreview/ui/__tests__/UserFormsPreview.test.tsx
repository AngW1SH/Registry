import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserFormsPreview from "../UserFormsPreview";
import {
  staticProfileTeamAssigned,
  useProfileQuery,
} from "@/composites/Profile";
import { staticForms } from "@/entities/Form";

jest.mock("@/composites/Profile", () => {
  const original = jest.requireActual("@/composites/Profile");

  return {
    ...original,
    useProfileQuery: jest.fn(),
  };
});

describe("UserProfilePreview widget UI", () => {
  describe("User logged in", () => {
    beforeAll(() => {
      (useProfileQuery as jest.Mock).mockReturnValue({
        data: { ...staticProfileTeamAssigned, forms: staticForms },
      });
    });
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should render the block", () => {
      const { getByText } = render(<UserFormsPreview />);

      const title = getByText(/Анкеты/i);

      expect(title).toBeInTheDocument();
    });

    it("should inform the user if no forms are completed", () => {
      const notCompletedForms = staticForms.map((form) => ({
        ...form,
        completed: null,
      }));
      (useProfileQuery as jest.Mock).mockReturnValueOnce({
        data: { ...staticProfileTeamAssigned, forms: notCompletedForms },
      });

      const { getByText } = render(<UserFormsPreview />);

      const warning = getByText(/У вас нет пройденных анкет/i);
      expect(warning).toBeVisible();
    });

    it("should show the number of completed forms", () => {
      const { getByText } = render(<UserFormsPreview />);

      const count = staticForms.reduce(
        (sum, cur) => (cur.completed ? sum + 1 : sum),
        0,
      );

      const element = getByText(new RegExp("" + count));

      expect(element).toBeInTheDocument();
    });

    it("should show a redirect button", () => {
      const { getByText } = render(<UserFormsPreview />);

      const button = getByText(/Заполнить анкету/i);

      expect(button).toBeVisible();
    });
  });

  describe("User not logged in", () => {
    beforeAll(() => {
      (useProfileQuery as jest.Mock).mockReturnValue({
        data: null,
      });
    });
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("shouldn't render the block", () => {
      const { queryByText } = render(<UserFormsPreview />);

      const title = queryByText(/Анкеты/i);

      expect(title).not.toBeInTheDocument();
    });
  });
});

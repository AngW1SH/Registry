import { render } from "@testing-library/react";
import UserForms from "../UserForms";
import { staticProfileTeamHiring, useProfileQuery } from "@/composites/Profile";

import "@testing-library/jest-dom";
import { staticForms } from "@/entities/Form";
jest.mock("@/composites/Profile", () => {
  const original = jest.requireActual("@/composites/Profile");

  return {
    ...original,
    useProfileQuery: jest.fn(),
  };
});
describe("UserForms widget UI", () => {
  describe("User logged in", () => {
    describe("Available forms exist", () => {
      it("should render the forms", () => {
        (useProfileQuery as jest.Mock).mockReturnValue({
          data: {
            ...staticProfileTeamHiring,
            forms: staticForms,
          },
        });

        const { getByText } = render(<UserForms />);

        staticForms.forEach((form) => {
          const element = getByText(form.name);
          expect(element).toBeInTheDocument();
        });
      });

      describe("User has completed the form", () => {
        const date = new Date("2020-10-29");
        beforeAll(() => {
          (useProfileQuery as jest.Mock).mockReturnValue({
            data: {
              ...staticProfileTeamHiring,
              forms: [{ ...staticForms[0], completed: date }],
            },
          });
        });
        it("should tell the user when they completed a form", () => {
          const { getByText } = render(<UserForms />);

          const dateCompleted = getByText(
            date.toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
          );

          expect(dateCompleted).toBeVisible();
        });

        it("should allow the user to complete the form again", () => {
          const { getByText } = render(<UserForms />);

          const button = getByText(/Пройти заново/i);
          expect(button).toBeVisible();
        });
      });

      describe("User hasn't completed the form", () => {
        beforeAll(() => {
          jest.clearAllMocks();
          (useProfileQuery as jest.Mock).mockReturnValue({
            data: {
              ...staticProfileTeamHiring,
              forms: [{ ...staticForms[0], completed: null }],
            },
          });
        });

        it("should invite the user to complete a form", () => {
          const { getByText } = render(<UserForms />);

          const button = getByText(/Пройти/i);

          expect(button).toBeVisible();
        });
      });
    });

    describe("No available forms exist", () => {
      beforeAll(() => {
        jest.clearAllMocks();
        (useProfileQuery as jest.Mock).mockReturnValue({
          data: {
            ...staticProfileTeamHiring,
            forms: [],
          },
        });
      });
      it("should inform the user that there are no available forms right now", () => {
        const { getByText } = render(<UserForms />);

        const notification = getByText(/Пока нет доступных анкет/i);
        expect(notification).toBeVisible();
      });
    });
  });
  describe("User not logged in", () => {
    beforeAll(() => {
      jest.clearAllMocks();
      (useProfileQuery as jest.Mock).mockReturnValue({
        data: null,
      });
    });
    it("shouldn't render the block", () => {
      const { queryByText } = render(<UserForms />);

      const title = queryByText(/Анкеты/i);
      expect(title).not.toBeInTheDocument();
    });
  });
});

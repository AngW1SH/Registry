import { ProjectStatus, initialFilters } from "../../config/initialFilters";
import ProjectFilters from "../ProjectFilters";
import {
  fireEvent,
  render,
  waitFor,
  getByText,
  getAllByText,
  getByPlaceholderText,
  getByDisplayValue,
} from "@testing-library/react";
import "@testing-library/jest-dom";

describe("ProjectFilters Entity UI", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("18 Sep 2023 18:30 GMT").getTime());
  });
  it("displays all status options", () => {
    const statusOptions = [...ProjectStatus];

    const { getByText } = render(
      <ProjectFilters filters={initialFilters} dynamic={false} />,
    );

    statusOptions.forEach((option) => {
      expect(getByText(option)).toBeInTheDocument();
    });
  });

  it("renders border for the selected status", async () => {
    const { getByText } = render(
      <ProjectFilters filters={initialFilters} dynamic={false} />,
    );

    const element = getByText(ProjectStatus[1]);
    expect(element).toBeInTheDocument();

    fireEvent.click(element);

    expect(element.classList.contains("border-primary")).toBe(true);
  });

  it("should change project name", async () => {
    const { getByPlaceholderText } = render(
      <ProjectFilters filters={initialFilters} dynamic={false} />,
    );

    const projectNameInput = getByPlaceholderText(/Текст/i) as HTMLInputElement;

    fireEvent.change(projectNameInput, { target: { value: "Тест" } });

    expect(projectNameInput.value).toBe("Тест");
  });
});
/*
describe("SearchWithRedirect Feature UI Inputs", () => {

  
  I honestly have no clue why it doesn't work
  it("sets the date-start and date-end", async () => {
    const { getByTestId } = render(<SearchWithRedirect />);

    const calendar1 = getByTestId("project-enrollment-dates-calendar");

    fireEvent.click(getByPlaceholderText(calendar1, /записи/));

    const dateStart = calendar1.querySelectorAll(
      ".rdrDay:not(.rdrDayPassive)",
    )[0] as HTMLElement;
    const dateEnd = calendar1.querySelectorAll(
      ".rdrDay:not(.rdrDayPassive)",
    )[1] as HTMLElement;

    fireEvent.click(getByText(dateStart, /1/));
    fireEvent.click(getByText(dateEnd, /2/));

    await waitFor(() => {
      const calendar = getByTestId("project-enrollment-dates-calendar");
      expect(getByPlaceholderText(calendar, /записи/).value).not.toBe("");
    });
  }); 
  
});
*/

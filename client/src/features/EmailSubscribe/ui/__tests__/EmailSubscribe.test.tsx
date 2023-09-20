import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmailSubscribe from "../EmailSubscribe";

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  }),
) as jest.Mock;

describe("EmailSubsribe Feature UI", () => {
  it("contains an editable email input", () => {
    const { getByPlaceholderText } = render(<EmailSubscribe />);
    const input = getByPlaceholderText(/электронная почта/i);

    expect(input).toBeInTheDocument();

    fireEvent.input(input, {
      value: "test@mail.ru",
    });

    waitFor(() => {
      expect((input as HTMLInputElement).value).toBe("test@mail.ru");
    });
  });
  it("sends an API request on submit", () => {
    const { getByRole } = render(<EmailSubscribe />);
    const submit = getByRole("button");
    fireEvent.click(submit);

    waitFor(() => {
      expect(fetch).toBeCalledTimes(1);
    });
  });
});

import { fireEvent, render, waitFor } from "@testing-library/react";
import SendContactFormEmail from "../SendContactFormEmail";
import "@testing-library/jest-dom";

global.fetch = (() =>
  Promise.resolve({
    status: 200,
    json: Promise.resolve({}),
  })) as jest.Mock;

describe("SendContactFOrmEmail Feature UI", () => {
  it("renders name and email editable input fields", () => {
    const { getByPlaceholderText } = render(<SendContactFormEmail />);

    const name = getByPlaceholderText(/имя/i);
    const email = getByPlaceholderText(/e-mail/i);

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();

    fireEvent.input(name, {
      target: {
        value: "TestName",
      },
    });

    waitFor(() => expect((name as HTMLInputElement).value).toBe("TestName"));

    fireEvent.input(email, {
      target: {
        value: "test@mail.ru",
      },
    });

    waitFor(() =>
      expect((name as HTMLInputElement).value).toBe("test@mail.ru"),
    );
  });

  it("sends an API request on submit", () => {
    const { getByRole } = render(<SendContactFormEmail />);
    const submit = getByRole("button");
    fireEvent.click(submit);

    waitFor(() => {
      expect(fetch).toBeCalledTimes(1);
    });
  });
});

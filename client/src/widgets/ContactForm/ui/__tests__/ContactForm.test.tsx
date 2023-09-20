import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactForm from "../ContactForm";

describe("ContactForm Widget UI", () => {
  it("renders the component title", () => {
    const { getByText } = render(<ContactForm />);

    expect(getByText(/заказчикам/i)).toBeInTheDocument();
  });

  it("renders name and email input fields", () => {
    const { getByPlaceholderText } = render(<ContactForm />);

    const name = getByPlaceholderText(/имя/i);
    const email = getByPlaceholderText(/e-mail/i);

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  test("snapshot test", () => {
    const { asFragment } = render(<ContactForm />);

    expect(asFragment()).toMatchSnapshot();
  });
});

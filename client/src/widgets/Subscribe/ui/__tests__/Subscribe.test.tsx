import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Subscribe from "../Subscribe";

describe("Subscribe Widget UI", () => {
  it("renders an explanation of what it does", () => {
    const { getByText } = render(<Subscribe />);
    const description = getByText(/Почтовая рассылка/i);

    expect(description).toBeInTheDocument();
  });

  it("contains an editable email input", () => {
    const { getByPlaceholderText } = render(<Subscribe />);
    const input = getByPlaceholderText(/электронная почта/i);

    expect(input).toBeInTheDocument();
  });

  test("snapshot test", () => {
    const { asFragment } = render(<Subscribe />);

    expect(asFragment()).toMatchSnapshot();
  });
});

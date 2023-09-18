import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroTitle from "../HeroTitle";

describe("Hero Title Widget UI", () => {
  it("displays the title", () => {
    const { getByText } = render(<HeroTitle />);

    expect(getByText(/Реестр проектов/)).toBeInTheDocument();
  });

  test("Snapshot test", () => {
    const { asFragment } = render(<HeroTitle />);

    expect(asFragment()).toMatchSnapshot();
  });
});

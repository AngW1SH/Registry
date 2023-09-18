import { render } from "@testing-library/react";
import HeroSearch from "../HeroSearch";

describe("HeroSearch Widget UI", () => {
  test("snapshot test", () => {
    const { asFragment } = render(<HeroSearch />);

    expect(asFragment()).toMatchSnapshot();
  });
});

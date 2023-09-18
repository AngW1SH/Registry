import { render } from "@testing-library/react";
import HeroNav from "../HeroNav";

describe("HeroNav Widget UI", () => {
  test("snapshot test", () => {
    const { asFragment } = render(<HeroNav />);

    expect(asFragment()).toMatchSnapshot();
  });
});

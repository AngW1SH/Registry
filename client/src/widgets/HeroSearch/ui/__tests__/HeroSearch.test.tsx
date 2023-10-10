import { render } from "@testing-library/react";
import HeroSearch from "../HeroSearch";
import { QueryWrapper } from "@/shared/utils";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: () => null,
    };
  },
  usePathname() {
    return {};
  },
}));

describe("HeroSearch Widget UI", () => {
  test("snapshot test", () => {
    const { asFragment } = render(
      <QueryWrapper>
        <HeroSearch />
      </QueryWrapper>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

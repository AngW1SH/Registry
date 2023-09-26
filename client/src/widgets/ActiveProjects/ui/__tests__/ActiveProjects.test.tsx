import { render } from "@testing-library/react";
import ActiveProjects from "../ActiveProjects";
import { staticTags } from "@/entities/Tag";
import { staticProjects } from "@/entities/Project";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("ActiveProjects Widget UI", () => {
  test("snapshot test", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { projects: staticProjects, tags: staticTags },
      isLoading: false,
      error: {},
    });
    const Component = ActiveProjects({
      data: { tags: staticTags, projects: staticProjects },
    });

    // @ts-ignore
    const { asFragment } = render(await Component);

    expect(asFragment()).toMatchSnapshot();
  });
});

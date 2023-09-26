import { render, waitFor } from "@testing-library/react";
import ProjectsSearch from "../ProjectsSearch";
import { staticProjects } from "@/entities/Project";
import { staticTags } from "@/entities/Tag";

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({ projects: [], tags: [] }),
  }),
) as jest.Mock;

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);

describe("ProjectsSearch Widget UI", () => {
  it("should fetch projects with no filters", async () => {
    const Component = ProjectsSearch({});

    // @ts-ignore
    render(await Component);

    waitFor(() => {
      expect(fetch).toBeCalledTimes(1);
    });
  });

  test("snapshot test", async () => {
    const Component = ProjectsSearch({
      data: {
        projects: staticProjects,
        tags: staticTags,
      },
    });

    // @ts-ignore
    const { asFragment } = render(await Component);

    expect(asFragment()).toMatchSnapshot();
  });
});

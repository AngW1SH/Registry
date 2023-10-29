import { fireEvent, render } from "@testing-library/react";
import SearchWithProjectList from "../SearchWithProjectList";
import { fetchProjects } from "../../api/fetchProjects";
import { staticProjects } from "@/entities/Project";
import "@testing-library/jest-dom";
import { staticTags } from "@/entities/Tag";
import { QueryWrapper } from "@/shared/utils";

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({ projects: staticProjects, tags: staticTags }),
  }),
) as jest.Mock;

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
});

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);

jest.mock("../../api/fetchProjects", () => {
  return {
    fetchProjects: jest.fn(() =>
      Promise.resolve({
        projects: staticProjects,
        tags: staticTags,
      }),
    ),
  };
});

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

describe("SearchWithProjectList Feature UI", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render initial projects", () => {
    const { getByText } = render(
      <QueryWrapper>
        <SearchWithProjectList
          initialData={{
            projects: staticProjects,
            tags: staticTags,
          }}
        />
      </QueryWrapper>,
    );

    staticProjects.map((project) => {
      expect(getByText(project.name)).toBeVisible();
    });
  });

  it("should fetch projects when filters change", () => {
    const { getAllByText, getAllByPlaceholderText } = render(
      <QueryWrapper>
        <SearchWithProjectList
          initialData={{
            projects: staticProjects,
            tags: staticTags,
          }}
        />
      </QueryWrapper>,
    );

    const textInput = getAllByPlaceholderText(/текст/i)[0];

    fireEvent.input(textInput, {
      target: {
        value: "испан",
      },
    });

    fireEvent.click(getAllByText(/найти проект/i)[0]);

    expect(fetchProjects).toBeCalled();

    expect(fetchProjects).toBeCalledWith(
      expect.objectContaining({
        text: "испан",
      }),
    );
  });
});

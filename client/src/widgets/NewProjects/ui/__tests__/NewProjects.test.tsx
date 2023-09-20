import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewProjects from "../NewProjects";
import { staticProjects } from "@/entities/Project";
import { staticTags } from "@/entities/Tag";

describe("NewProjects Widget UI", () => {
  it("renders projects", async () => {
    const Component = NewProjects({
      data: { projects: staticProjects, tags: staticTags },
    });
    // @ts-ignore
    const { getByText } = render(await Component);

    expect(getByText(staticProjects[0].name)).toBeInTheDocument();
  });

  test("snapshot test", async () => {
    const Component = NewProjects({
      data: { projects: staticProjects, tags: staticTags },
    });
    // @ts-ignore
    const { asFragment } = render(await Component);

    expect(asFragment()).toMatchSnapshot();
  });
});

import { render } from "@testing-library/react";
import ActiveProjects from "../ActiveProjects";
import { staticTags } from "@/entities/Tag";
import { staticProjects } from "@/entities/Project";

describe("ActiveProjects Widget UI", () => {
  test("snapshot test", async () => {
    const Component = ActiveProjects({
      data: { tags: staticTags, projects: staticProjects },
    });

    // @ts-ignore
    const { asFragment } = render(await Component);

    expect(asFragment()).toMatchSnapshot();
  });
});

import { fireEvent, render, waitFor } from "@testing-library/react";
import TagSlider from "../TagSlider";
import "@testing-library/jest-dom";
import { staticTags } from "../../static/staticTags";

describe("TagSlider Entity UI", () => {
  it("displays tags from props", () => {
    const { getByText } = render(<TagSlider tags={staticTags} />);

    staticTags.forEach((tag) => {
      expect(getByText(tag.name)).toBeInTheDocument();
    });
  });

  it("highlights clicked tags", () => {
    const { getByText } = render(<TagSlider tags={staticTags} />);

    const tagToClick = getByText(staticTags[1].name);
    fireEvent.click(tagToClick);

    waitFor(() => {
      expect(getByText(staticTags[1].name).classList.contains("active")).toBe(
        true,
      );
    });
  });

  it("moves the slider on drag", () => {
    const { container } = render(<TagSlider tags={staticTags} />);

    global.innerWidth = 500;

    const beforeX = container.getBoundingClientRect().x;
    fireEvent.drag(container, { x: -100, y: 0 });

    waitFor(() => {
      expect(container.getBoundingClientRect().x).not.toEqual(beforeX);
    });
  });

  it("doesn't select a tag on drag", () => {
    const { getByText } = render(<TagSlider tags={staticTags} />);

    const tagToDrag = getByText(staticTags[1].name);
    fireEvent.drag(tagToDrag, { x: -100, y: 0 });

    waitFor(() => {
      expect(getByText(staticTags[1].name).classList.contains("active")).toBe(
        false,
      );
    });
  });

  it("moves the slider on arrow click", () => {
    const { container, getByTestId } = render(<TagSlider tags={staticTags} />);

    global.innerWidth = 500;

    const beforeX = container.getBoundingClientRect().x;
    fireEvent.click(getByTestId("tag-slider-arrow-right"));

    waitFor(() => {
      expect(container.getBoundingClientRect().x).not.toEqual(beforeX);
    });
  });
});

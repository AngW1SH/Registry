import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import FeaturedCategories from "../FeaturedCategories";
import { staticValues } from "../../config/staticValues";

jest.mock("next/navigation");

describe("FeaturedCategories Widget UI", () => {
  it('renders a "suggest project" banner', async () => {
    const Component = FeaturedCategories({ categories: staticValues });
    // @ts-ignore
    const { getByText } = render(await Component);

    expect(getByText(/Предложить тему проекта/)).toBeInTheDocument();
  });

  it("renders categories from the list", async () => {
    const Component = FeaturedCategories({ categories: staticValues });
    // @ts-ignore
    const { getByText } = render(await Component);

    expect(getByText(/Математический анализ/)).toBeInTheDocument();
    expect(getByText(/Математическое моделирование/)).toBeInTheDocument();
  });

  test("snapshot test", async () => {
    const Component = FeaturedCategories({ categories: staticValues });
    // @ts-ignore
    const { asFragment } = render(await Component);

    expect(asFragment).toMatchSnapshot();
  });
});

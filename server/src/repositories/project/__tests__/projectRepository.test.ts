import {
  staticProjectDetailedStrapi,
  staticProjectListStrapi,
} from "@/entities/project/static/projectsWithTags";
import projectRepository from "..";
import { staticProjectsWithTagsResult } from "@/entities/project";

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(staticProjectListStrapi),
  })
) as jest.Mock;

describe("Project Repository", () => {
  describe("findMany method", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("shouldn't try accessing the database for impossible filters", async () => {
      const results = [];

      results.push(
        await projectRepository.findMany({
          dateStart: new Date("2023-02-20"),
          dateEnd: new Date("2023-02-02"),
        })
      );

      results.push(
        await projectRepository.findMany({
          dateStart: new Date("2023-02-20"),
          dateEnd: new Date("2023-02-02"),
        })
      );

      results.forEach((result) => {
        expect(result).toEqual({ projects: [], tags: [] });
      });

      expect(fetch).toBeCalledTimes(0);
    });

    it("should return projects even when no filters are provided", async () => {
      const result = await projectRepository.findMany();

      expect(result).toBeDefined();
      expect(fetch).toBeCalledTimes(1);
    });
  });

  describe("findOne method", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should throw an error if no ID is provided", async () => {
      const fakeId: any = null;

      expect(
        async () => await projectRepository.findOne(fakeId)
      ).rejects.toThrow();
      expect(fetch).toBeCalledTimes(0);
    });

    it("should return a project when everything is okay", async () => {
      // For the project request
      (fetch as jest.Mock).mockResolvedValueOnce(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(staticProjectDetailedStrapi),
        })
      );

      // For the project count request
      (fetch as jest.Mock).mockResolvedValueOnce(
        Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve({
              data: { id: 1, attributes: { requests: { count: 1 } } },
            }),
        })
      );
      const id = 1;

      const result = await projectRepository.findOne(id);

      expect(result).toBeDefined();
      expect(fetch).toBeCalledTimes(2);
    });
  });
});

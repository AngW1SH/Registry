import projectRepository from "..";
import { staticProjectsWithTagsResult } from "@/entities/project";

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(staticProjectsWithTagsResult),
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
        expect(result).toEqual([]);
      });

      expect(fetch).toBeCalledTimes(0);
    });

    it("should apply text filter as an OR for all existing text fields", async () => {
      const filters = {
        text: "testtext",
      };

      const result = await projectRepository.findMany(filters);

      expect((fetch as jest.Mock).mock.calls[0][0]).toMatch(/(testtext.*){3,}/);
    });

    it("should return projects even when no filters are provided", async () => {
      const result = await projectRepository.findMany();

      expect(result).toBeDefined();
      expect(fetch).toBeCalledTimes(1);
    });
  });
});

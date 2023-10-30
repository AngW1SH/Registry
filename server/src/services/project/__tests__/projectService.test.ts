import { staticProjectsWithTagsResult } from "@/entities/project";
import projectService from "..";
import {
  staticProjectDetailedStrapi,
  staticProjectListStrapi,
} from "@/entities/project/static/projectsWithTags";

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(staticProjectListStrapi),
  })
) as jest.Mock;

describe("Project Service", () => {
  describe("getActive method", () => {
    it("returns flattened projects with tags", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2023-09-23"));

      const result = await projectService.getActive();
      expect(result.projects).toBeDefined();
      expect(result.tags).toBeDefined();
      expect(typeof result.projects[0].tags[0]).toBe("number");
    });
  });

  describe("findMany method", () => {
    it("should return flattened projects with tags", async () => {
      const result = await projectService.findMany();
      expect(result.projects).toBeDefined();
      expect(result.tags).toBeDefined();
      expect(typeof result.projects[0].tags[0]).toBe("number");
    });
  });

  describe("findById method", () => {
    it("should return project, tags, teams and users", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(staticProjectDetailedStrapi),
        })
      );

      const result = await projectService.findById(1);

      expect(result).toBeDefined();
      expect(result!.project).toBeDefined();
      expect(result!.tags).toBeDefined();
      expect(result!.teams).toBeDefined();
      expect(result!.users).toBeDefined();
    });
  });
});

import { prisma } from "@/db/prisma-client";
import { staticProjectsWithTagsPrisma } from "@/entities/project";
import projectService from "..";

jest.mock("@/db/prisma-client", () => ({
  prisma: {
    project: {
      findMany: jest.fn(),
    },
  },
}));

describe("Project Service", () => {
  describe("getActive method", () => {
    it("returns flattened projects with tags", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2023-09-23"));
      (prisma.project.findMany as jest.Mock).mockReturnValueOnce(
        staticProjectsWithTagsPrisma
      );

      const result = await projectService.getActive();
      expect(result.projects).toBeDefined();
      expect(result.tags).toBeDefined();
      expect(typeof result.projects[0].tags[0]).toBe("string");
    });
  });

  describe("findMany method", () => {
    it("should return flattened projects with tags", async () => {
      (prisma.project.findMany as jest.Mock).mockReturnValueOnce(
        staticProjectsWithTagsPrisma
      );

      const result = await projectService.findMany();
      expect(result.projects).toBeDefined();
      expect(result.tags).toBeDefined();
      expect(typeof result.projects[0].tags[0]).toBe("string");
    });
  });
});
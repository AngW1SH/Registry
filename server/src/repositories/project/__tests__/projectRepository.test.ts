import { prisma } from "@/db/prisma-client";
import projectRepository from "..";
import { staticProjectsWithTagsPrisma } from "@/entities/project";

jest.mock("@/db/prisma-client", () => ({
  prisma: {
    project: {
      findMany: jest.fn(),
    },
  },
}));

describe("Project Repository", () => {
  describe("findMany method", () => {
    it("shouldn't try accessing the database for impossible filters", async () => {
      (prisma.project.findMany as jest.Mock).mockReturnValue(
        staticProjectsWithTagsPrisma
      );

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

      expect(prisma.project.findMany).toBeCalledTimes(0);
    });

    it("should apply text filter as an OR for all existing text fields", async () => {
      (prisma.project.findMany as jest.Mock).mockReturnValueOnce(
        staticProjectsWithTagsPrisma
      );

      const filters = {
        text: "test",
      };

      const result = await projectRepository.findMany(filters);

      expect(prisma.project.findMany).toBeCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            AND: expect.arrayContaining([
              {
                OR: expect.arrayContaining([
                  {
                    name: {
                      contains: "test",
                    },
                  },
                  {
                    description: {
                      contains: "test",
                    },
                  },
                  {
                    developerRequirements: {
                      contains: "test",
                    },
                  },
                ]),
              },
            ]),
          }),
        })
      );
    });
  });
});

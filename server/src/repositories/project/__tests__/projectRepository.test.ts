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
  describe("getActive method", () => {
    afterEach(() => {
      (prisma.project.findMany as jest.Mock).mockClear();
    });
    it("should return all active projects when no parameters are passed", async () => {
      (prisma.project.findMany as jest.Mock).mockReturnValueOnce(
        staticProjectsWithTagsPrisma
      );

      const result = await projectRepository.getActive();

      expect(result.length).toEqual(2);
    });

    it("should return just the projects that have specified tags", async () => {
      (prisma.project.findMany as jest.Mock).mockReturnValueOnce(
        staticProjectsWithTagsPrisma
      );

      const result = await projectRepository.getActive(["1"]);

      expect(prisma.project.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            tags: {
              some: {
                tagId: {
                  in: ["1"],
                },
              },
            },
          }),
        })
      );
    });
  });

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

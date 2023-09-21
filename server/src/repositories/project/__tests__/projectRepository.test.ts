import { prisma } from "@/db/prisma-client";
import projectRepository from "..";

jest.mock("@/db/prisma-client", () => ({
  prisma: {
    project: {
      findMany: jest.fn(),
    },
  },
}));

const getActiveSuccessfulResult = [
  {
    id: "1",
    name: "Биология растений в эпоху глобальных изменений климата",
    description:
      "ulla eu sem sit amet sem facilisis vehicula sit amet commodo magna tincidunt leo et tortor lacinia, non commodo ipsum efficitur",
    developerRequirements:
      " ulla eu sem sit amet sem facilisis vehicula sit amet commodo magna tincidunt leo et tortor lacinia, non commodo ipsum efficitur",
    dateStart: new Date("2023-09-01"),
    dateEnd: new Date("2023-12-01"),
    enrollmentStart: new Date("2023-08-20"),
    enrollmentEnd: new Date("2023-09-01"),
    supervisor: "Иванов П. М.",
    tags: [
      {
        Tag: {
          id: "1",
          name: "Философия",
        },
      },
      {
        Tag: {
          id: "2",
          name: "Биология",
        },
      },
    ],
    isPublic: true,
  },
  {
    id: "4",
    name: "Изучение социально-экономических проблем соверменного испанского общества",
    description:
      "ulla eu sem sit amet sem facilisis vehicula sit amet commodo magna tincidunt leo et tortor lacinia, non commodo ipsum efficitur",
    developerRequirements:
      " ulla eu sem sit amet sem facilisis vehicula sit amet commodo magna tincidunt leo et tortor lacinia, non commodo ipsum efficitur",
    dateStart: new Date("2023-09-07"),
    dateEnd: new Date("2023-12-10"),
    enrollmentStart: new Date("2023-09-01"),
    enrollmentEnd: new Date("2023-09-07"),
    supervisor: "Новиков В. С.",
    tags: [
      {
        Tag: {
          id: "3",
          name: "Социология",
        },
      },
    ],
    isPublic: true,
  },
];

describe("Project Repository", () => {
  describe("getActive method", () => {
    afterEach(() => {
      (prisma.project.findMany as jest.Mock).mockClear();
    });
    it("returns all active projects when no parameters are passed", async () => {
      (prisma.project.findMany as jest.Mock).mockReturnValueOnce(
        getActiveSuccessfulResult
      );

      const result = await projectRepository.getActive();

      expect(result.length).toEqual(2);
    });

    it("queries just the projects that have specified tags", async () => {
      (prisma.project.findMany as jest.Mock).mockReturnValueOnce(
        getActiveSuccessfulResult
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
});

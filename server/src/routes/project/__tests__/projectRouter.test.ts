import generateApp from "@/app";
import request from "supertest";

import { prisma } from "@/db/prisma-client";
import { staticProjectsWithTagsPrisma } from "@/entities/project";

jest.mock("@/db/prisma-client", () => ({
  prisma: {
    project: {
      findMany: jest.fn(),
    },
  },
}));

describe("Project Router", () => {
  describe("/active route", () => {
    describe("when everything is okay", () => {
      it("should return a json with a 200 status", async () => {
        request(generateApp())
          .get("/project/active")
          .expect("Content-Type", /json/)
          .expect(200);
      });

      it("should return a list of projects and tags", async () => {
        (prisma.project.findMany as jest.Mock).mockReturnValueOnce(
          staticProjectsWithTagsPrisma
        );

        const result = await request(generateApp()).get("/project/active");
        expect(result.body.projects).toBeDefined();
        expect(result.body.tags).toBeDefined();
      });
    });

    describe("when something is wrong", () => {
      it("returns 500 on db connection failure", async () => {
        (prisma.project.findMany as jest.Mock).mockReturnValueOnce(new Error());

        request(generateApp()).get("/project/active").expect(500);
      });
    });
  });
});

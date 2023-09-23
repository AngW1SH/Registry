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

const app = generateApp();

describe("Project Router", () => {
  describe("/active route", () => {
    describe("when everything is okay", () => {
      it("should send a json with a 200 status", async () => {
        (prisma.project.findMany as jest.Mock).mockReturnValueOnce(
          staticProjectsWithTagsPrisma
        );
        const result = await request(app).get("/project/active");

        expect(result.status).toBe(200);
      });

      it("should send a list of projects and tags", async () => {
        (prisma.project.findMany as jest.Mock).mockReturnValueOnce(
          staticProjectsWithTagsPrisma
        );
        const result = await request(app).get("/project/active");
        expect(result.body.projects).toBeDefined();
        expect(result.body.tags).toBeDefined();
      });
    });

    describe("when something is wrong", () => {
      it("should send a 500 status on db connection failure", async () => {
        (prisma.project.findMany as jest.Mock).mockImplementation(() => {
          throw new Error();
        });

        const result = await request(app).get("/project/active");

        expect(result.status).toBe(500);
      });
    });
  });

  describe("/findmany route", () => {
    describe("when everything is okay", () => {
      it("should send a json with a 200 status", async () => {
        (prisma.project.findMany as jest.Mock).mockReturnValueOnce(
          staticProjectsWithTagsPrisma
        );
        const result = await request(generateApp())
          .post("/project/findmany")
          .expect("Content-Type", /json/);

        expect(result.status).toBe(200);
      });

      it("should send a list of projects and tags", async () => {
        (prisma.project.findMany as jest.Mock).mockReturnValueOnce(
          staticProjectsWithTagsPrisma
        );
        const result = await request(app).post("/project/findmany");
        expect(result.body.projects).toBeDefined();
        expect(result.body.tags).toBeDefined();
      });
    });

    //not working as expected, doesn't even require prisma.project.findMany to be invoked to pass
    describe("when something is wrong", () => {
      it("should send a 500 status on db connection failure", async () => {
        (prisma.project.findMany as jest.Mock).mockImplementation(() => {
          throw new Error();
        });

        const result = await request(generateApp()).post("/project/findmany");

        expect(result.status).toBe(500);
      });
    });
  });
});

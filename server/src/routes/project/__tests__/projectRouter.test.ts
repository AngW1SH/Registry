import generateApp from "@/app";
import request from "supertest";

import { staticProjectsWithTagsResult } from "@/entities/project";

const app = generateApp();

describe("Project Router", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(staticProjectsWithTagsResult),
      })
    ) as jest.Mock;
  });
  describe("/active route", () => {
    describe("when everything is okay", () => {
      it("should send a json with a 200 status", async () => {
        const result = await request(app)
          .get("/project/active")
          .expect("Content-Type", /json/);

        expect(result.status).toBe(200);
      });

      it("should send a list of projects and tags", async () => {
        const result = await request(app).get("/project/active");
        expect(result.body.projects).toBeDefined();
        expect(result.body.tags).toBeDefined();
      });
    });

    describe("when something is wrong", () => {
      it("should send a 500 status on db connection failure", async () => {
        (fetch as jest.Mock).mockImplementation(() => {
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
        const result = await request(generateApp())
          .get("/project/findmany")
          .expect("Content-Type", /json/);

        expect(result.status).toBe(200);
      });

      it("should send a list of projects and tags", async () => {
        const result = await request(app).get("/project/findmany");
        expect(result.body.projects).toBeDefined();
        expect(result.body.tags).toBeDefined();
      });
    });

    describe("when something is wrong", () => {
      it("should send a 500 status on db connection failure", async () => {
        (fetch as jest.Mock).mockImplementation(() => {
          throw new Error();
        });

        const result = await request(generateApp()).get("/project/findmany");

        expect(result.status).toBe(500);
      });
    });
  });
});

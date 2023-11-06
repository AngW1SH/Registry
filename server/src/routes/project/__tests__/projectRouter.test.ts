import generateApp from "@/app";
import request from "supertest";

import { staticProjectsWithTagsResult } from "@/entities/project";
import {
  staticProjectDetailedStrapi,
  staticProjectListStrapi,
} from "@/entities/project/static/projectsWithTags";

const app = generateApp();

describe("Project Router", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(staticProjectListStrapi),
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

  describe("findbyid route", () => {
    describe("when everything is okay", () => {
      beforeEach(() => {
        jest.clearAllMocks();

        global.fetch = jest.fn(() =>
          Promise.resolve({
            status: 200,
            json: () => Promise.resolve(staticProjectDetailedStrapi),
          })
        ) as jest.Mock;
      });
      it("should send a json with a 200 status", async () => {
        const result = await request(generateApp())
          .get("/project/1")
          .expect("Content-Type", /json/);

        expect(result.status).toBe(200);
      });

      it("should send an object with a project and its tags", async () => {
        const result = await request(generateApp()).get("/project/1");
        expect(result.body.project).toBeDefined();
        expect(result.body.tags).toBeDefined();
      });
    });
  });
});

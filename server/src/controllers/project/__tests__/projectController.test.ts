import { staticProjectsWithTagsResult } from "@/entities/project";
import projectController from "..";
import { staticProjectDetailedStrapi } from "@/entities/project/static/projectsWithTags";

const req: any = {};
const res: any = {};
req.body = {};
res.status = jest.fn().mockReturnValue(res);
res.sendStatus = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(staticProjectsWithTagsResult),
  })
) as jest.Mock;

describe("Project Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(staticProjectsWithTagsResult),
      })
    ) as jest.Mock;
  });
  describe("getActive method", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });
    it("should send a json", async () => {
      await projectController.getActive(req, res);

      expect(res.json).toHaveBeenCalled();
    });

    it("should send a 200 status", async () => {
      await projectController.getActive(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("findById method", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      (fetch as jest.Mock).mockResolvedValueOnce(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(staticProjectDetailedStrapi),
        })
      );
    });
    it("should accept a POST-request with body.id", async () => {
      req.body = {
        id: 1,
      };
      await projectController.findById(req, res);

      expect(res.json).toHaveBeenCalled();
    });

    it("should accept a GET-request", async () => {
      req.params = {
        id: 1,
      };
      await projectController.findById(req, res);

      expect(res.json).toHaveBeenCalled();
    });

    it("should send a 200 status", async () => {
      req.body = {
        id: 1,
      };
      await projectController.findById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("findMany method", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });
    it("should send a json", async () => {
      await projectController.findMany(req, res);

      expect(res.json).toHaveBeenCalled();
    });

    it("should send a 200 status", async () => {
      await projectController.findMany(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});

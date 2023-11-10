import { staticProjectsWithTagsResult } from "@/entities/project";
import projectController from "..";
import {
  staticProjectDetailedStrapi,
  staticProjectList,
  staticProjectListStrapi,
} from "@/entities/project/static/projectsWithTags";
import projectService from "@/services/project";
import { staticTags } from "@/entities/tag/static/staticTags";
import { BadRequestError, ServerError } from "@/helpers/errors";

const req: any = {};
const res: any = {};
req.body = {};
res.status = jest.fn().mockReturnValue(res);
res.sendStatus = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(staticProjectListStrapi),
  })
) as jest.Mock;

jest.mock("@/services/project");

describe("Project Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(staticProjectListStrapi),
      })
    ) as jest.Mock;
  });
  describe("getActive method", () => {
    beforeAll(() => {
      (projectService.getActive as jest.Mock).mockResolvedValue({
        projects: staticProjectList,
        tags: staticTags,
      });
    });
    beforeEach(() => {
      jest.clearAllMocks();
    });
    afterAll(() => {
      jest.clearAllMocks();
    });
    it("should send a json", async () => {
      await projectController.getActive(req, res, jest.fn());

      expect(res.json).toHaveBeenCalled();
    });

    it("should send a 200 status", async () => {
      await projectController.getActive(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should call projectService.getActive with the list of tag ids", async () => {
      await projectController.getActive(
        { ...req, body: { tagIds: [1, 2] } },
        res,
        jest.fn()
      );

      expect(projectService.getActive).toHaveBeenCalledWith(
        expect.arrayContaining([1, 2])
      );
    });

    it("should pass errors to middleware", async () => {
      (projectService.getActive as jest.Mock).mockImplementationOnce(() => {
        throw new ServerError("");
      });

      const nextMock = jest.fn();

      await projectController.getActive(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });
  });

  describe("getNew method", () => {
    beforeAll(() => {
      (projectService.getNew as jest.Mock).mockResolvedValue({
        projects: staticProjectList,
        tags: staticTags,
      });
    });
    it("should send a json", async () => {
      await projectController.getActive(req, res, jest.fn());

      expect(res.json).toHaveBeenCalled();
    });

    it("should send a 200 status", async () => {
      await projectController.getActive(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should pass errors to middleware", async () => {
      (projectService.getNew as jest.Mock).mockImplementationOnce(() => {
        throw new ServerError("");
      });

      const nextMock = jest.fn();

      await projectController.getNew(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
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
      await projectController.findById(req, res, jest.fn());

      expect(res.json).toHaveBeenCalled();
    });

    it("should accept a GET-request", async () => {
      req.params = {
        id: 1,
      };
      await projectController.findById(req, res, jest.fn());

      expect(res.json).toHaveBeenCalled();
    });

    it("should send a 200 status", async () => {
      req.body = {
        id: 1,
      };
      await projectController.findById(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should pass errors to middleware", async () => {
      (projectService.findById as jest.Mock).mockImplementationOnce(() => {
        throw new ServerError("");
      });

      const nextMock = jest.fn();

      await projectController.findById(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });

    it("should throw an error if the ID is not provided", async () => {
      req.body = {};
      req.params = {};

      const nextMock = jest.fn();
      await projectController.findById(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });
  });

  describe("findMany method", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });
    it("should send a json", async () => {
      await projectController.findMany(req, res, jest.fn());

      expect(res.json).toHaveBeenCalled();
    });

    it("should send a 200 status", async () => {
      await projectController.findMany(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should pass errors to middleware", async () => {
      (projectService.findMany as jest.Mock).mockImplementationOnce(() => {
        throw new ServerError("");
      });

      const nextMock = jest.fn();

      await projectController.findMany(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });
  });
});

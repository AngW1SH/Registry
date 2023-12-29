import { staticUser } from "@/entities/user";
import projectResultsService from "@/services/project-results";
import projectResultsController from "..";
import {
  BadRequestError,
  ServerError,
  UnauthorizedError,
} from "@/helpers/errors";
import { staticProjectList } from "@/entities/project";

jest.mock("@/services/project-results");
const req: any = {};
const res: any = {};
req.body = {};
res.status = jest.fn().mockReturnValue(res);
res.sendStatus = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);

describe("projectResultsController", () => {
  describe("uploadFiles method", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should call projectResultsService.uploadFiles when everything is ok", async () => {
      req.user = staticUser;
      req.params = {
        id: staticProjectList[0].id,
      };
      req.files = { files: [{ name: "testfile.jpg" }] };

      await projectResultsController.uploadFiles(req, res, jest.fn());

      expect(projectResultsService.uploadFiles).toHaveBeenCalled();
      expect(projectResultsService.uploadFiles).toHaveBeenCalledWith(
        +req.params.id,
        req.files.files,
        req.user
      );
    });
    it("should send a status 200 when everything is ok", async () => {
      req.user = staticUser;
      req.params = {
        id: staticProjectList[0].id,
      };
      req.files = { files: [{ name: "testfile.jpg" }] };

      await projectResultsController.uploadFiles(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("should pass all errors to middleware", async () => {
      (projectResultsService.uploadFiles as jest.Mock).mockImplementationOnce(
        async () => {
          throw new ServerError("");
        }
      );
      req.user = staticUser;
      req.params = {
        id: staticProjectList[0].id,
      };
      req.files = { files: [{ name: "testfile.jpg" }] };

      const nextMock = jest.fn();

      await projectResultsController.uploadFiles(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });
    it("should throw an UnauthorizedError when no user is specified in req.user", async () => {
      req.user = null;
      req.params = {
        id: staticProjectList[0].id,
      };
      req.files = { files: [{ name: "testfile.jpg" }] };

      const nextMock = jest.fn();

      await projectResultsController.uploadFiles(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(UnauthorizedError);
    });
    it("should throw a BadRequestError when the 'id' parameter is not specified", async () => {
      req.user = staticUser;
      req.params = {};
      req.files = { files: [{ name: "testfile.jpg" }] };

      const nextMock = jest.fn();

      await projectResultsController.uploadFiles(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });
    it("should throw a BadRequestError if req.files are not provided", async () => {
      req.params = {
        id: staticProjectList[0].id,
      };
      req.files = {};
      req.user = staticUser;

      const nextMock = jest.fn();

      await projectResultsController.uploadFiles(req, res, nextMock);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);

      req.files = undefined;

      await projectResultsController.uploadFiles(req, res, nextMock);
      expect(nextMock.mock.calls[1][0]).toBeInstanceOf(BadRequestError);
    });
    it("should extract files correctly whether they are in an array or not", async () => {
      req.params = {
        id: 1,
      };
      req.files = { files: [{ name: "testfile.jpg" }] };
      req.user = staticUser;

      const nextMock = jest.fn();

      const result = await projectResultsController.uploadFiles(
        req,
        res,
        nextMock
      );
      expect(projectResultsService.uploadFiles).toHaveBeenCalledWith(
        +req.params.id,
        req.files.files,
        req.user
      );

      req.files = { files: { name: "testfile.jpg" } };

      const result2 = await projectResultsController.uploadFiles(
        req,
        res,
        nextMock
      );
      expect(projectResultsService.uploadFiles).toHaveBeenCalledWith(
        +req.params.id,
        expect.arrayContaining([req.files.files]),
        req.user
      );
    });
  });
});

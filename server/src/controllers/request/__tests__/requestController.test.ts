import { staticProjectList } from "@/entities/project";
import requestController from "..";
import {
  BadRequestError,
  ServerError,
  UnauthorizedError,
} from "@/helpers/errors";
import requestService from "@/services/request";
import { staticTeams } from "@/entities/team";
import { staticUser } from "@/entities/user";
import projectService from "@/services/project";

const req: any = {};
const res: any = {};
req.body = {};
res.status = jest.fn().mockReturnValue(res);
res.send = jest.fn().mockReturnValue(res);
res.sendStatus = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

jest.mock("@/services/request");

describe("requestController", () => {
  describe("edit method", () => {
    it("should send a 200 status when everything is okay", async () => {
      req.body = {
        request: 1,
      };
      req.method = "PUT";
      req.files = { files: [{ name: "testfile.jpg" }] };
      req.user = staticUser;

      await requestController.edit(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should call requestService.edit with the correct function arguments", async () => {
      req.body = {
        request: 1,
      };
      req.method = "PUT";
      req.files = { files: [{ name: "testfile.jpg" }] };
      req.user = staticUser;

      await requestController.edit(req, res, jest.fn());

      expect(requestService.edit).toHaveBeenCalledWith(
        req.body.request,
        staticUser,
        expect.arrayContaining(req.files.files)
      );
    });

    it("should pass errors to middleware", async () => {
      (requestService.edit as jest.Mock).mockImplementationOnce(() => {
        throw new ServerError("");
      });

      req.body = {
        request: 1,
      };
      req.method = "PUT";
      req.files = { files: [{ name: "testfile.jpg" }] };
      req.user = staticUser;

      const nextMock = jest.fn();

      const result = await requestController.edit(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });

    it("should throw a BadRequestError if the HTTP-method is not PUT", async () => {
      req.body = {
        request: 1,
      };
      req.files = { files: [{ name: "testfile.jpg" }] };
      req.user = staticUser;

      const nextMock = jest.fn();

      req.method = "POST";
      const result = await requestController.edit(req, res, nextMock);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);

      req.method = "GET";
      const result2 = await requestController.edit(req, res, nextMock);
      expect(nextMock.mock.calls[1][0]).toBeInstanceOf(BadRequestError);

      req.method = "DELETE";
      const result3 = await requestController.edit(req, res, nextMock);
      expect(nextMock.mock.calls[2][0]).toBeInstanceOf(BadRequestError);
    });

    it("should throw a BadRequestError if the edited request's id is not specified", async () => {
      req.body = {};
      req.method = "PUT";
      req.files = { files: [{ name: "testfile.jpg" }] };
      req.user = staticUser;

      const nextMock = jest.fn();

      const result = await requestController.edit(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it("should throw a BadRequestError if req.files are not provided", async () => {
      req.body = {
        request: 1,
      };
      req.method = "PUT";
      req.files = {};
      req.user = staticUser;

      const nextMock = jest.fn();

      const result = await requestController.edit(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it("should throw an UnauthorizedError if req.user is not defined", async () => {
      req.body = {
        request: 1,
      };
      req.method = "PUT";
      req.files = { files: [{ name: "testfile.jpg" }] };
      req.user = undefined;

      const nextMock = jest.fn();

      const result = await requestController.edit(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(UnauthorizedError);
    });
  });

  describe("add method", () => {
    it("should send a 200 status when everything is okay", async () => {
      req.body = {
        project: staticProjectList[0].id,
        team: staticTeams[0].id,
      };
      req.files = { files: [{ name: "testfile.jpg" }] };
      req.user = staticUser;

      await requestController.add(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should call requestService.add with the correct function arguments", async () => {
      req.body = {
        project: staticProjectList[0].id,
        team: staticTeams[0].id,
      };
      req.files = { files: [{ name: "testfile.jpg" }] };
      req.user = staticUser;

      await requestController.add(req, res, jest.fn());

      expect(requestService.add).toHaveBeenCalledWith(
        staticTeams[0].id,
        staticProjectList[0].id,
        staticUser,
        expect.arrayContaining(req.files.files)
      );
    });

    it("should pass errors to middleware", async () => {
      (requestService.add as jest.Mock).mockImplementationOnce(() => {
        throw new ServerError("");
      });

      req.body = {
        project: staticProjectList[0].id,
        team: staticTeams[0].id,
      };
      req.files = { files: [{ name: "testfile.jpg" }] };
      req.user = staticUser;

      const nextMock = jest.fn();

      const result = await requestController.add(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });

    it("should throw a BadRequestError if the team id is not specified", async () => {
      req.body = {
        project: staticProjectList[0].id,
      };
      req.files = { files: [{ name: "testfile.jpg" }] };
      req.user = staticUser;

      const nextMock = jest.fn();

      const result = await requestController.add(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it("should throw a BadRequestError if the project id is not specified", async () => {
      req.body = {
        team: staticTeams[0].id,
      };
      req.files = { files: [123] };
      req.user = staticUser;

      const nextMock = jest.fn();

      const result = await requestController.add(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it("should throw a BadRequestError if req.files are not provided", async () => {
      req.body = {
        project: staticProjectList[0].id,
        team: staticTeams[0].id,
      };
      req.files = {};
      req.user = staticUser;

      const nextMock = jest.fn();

      const result = await requestController.add(req, res, nextMock);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);

      req.files = undefined;

      const result2 = await requestController.add(req, res, nextMock);
      expect(nextMock.mock.calls[1][0]).toBeInstanceOf(BadRequestError);
    });

    it("should throw an UnauthorizedError if req.user is not defined", async () => {
      req.body = {
        project: staticProjectList[0].id,
        team: staticTeams[0].id,
      };
      req.files = { files: [{ name: "testfile.jpg" }] };
      req.user = undefined;

      const nextMock = jest.fn();

      const result = await requestController.add(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(UnauthorizedError);
    });

    it("should extract files correctly whether they are in an array or not", async () => {
      req.body = {
        project: staticProjectList[0].id,
        team: staticTeams[0].id,
      };
      req.files = { files: [{ name: "testfile.jpg" }] };
      req.user = undefined;

      const nextMock = jest.fn();

      const result = await requestController.add(req, res, nextMock);
      expect(requestService.add as jest.Mock).toHaveBeenCalledWith(
        staticTeams[0].id,
        staticProjectList[0].id,
        expect.objectContaining(staticUser),
        expect.arrayContaining(req.files.files)
      );

      req.files = { files: { name: "testfile.jpg" } };

      const result2 = await requestController.add(req, res, nextMock);
      expect(requestService.add as jest.Mock).toHaveBeenCalledWith(
        staticTeams[0].id,
        staticProjectList[0].id,
        expect.objectContaining(staticUser),
        expect.arrayContaining([req.files.files])
      );
    });
  });
});

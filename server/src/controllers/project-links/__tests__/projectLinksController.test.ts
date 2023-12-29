import { staticUser } from "@/entities/user";
import projectLinksController from "..";
import projectLinksService from "@/services/project-links";
import {
  BadRequestError,
  ServerError,
  UnauthorizedError,
} from "@/helpers/errors";

const req: any = {};
const res: any = {};

jest.mock("@/services/project-links");

req.body = {};
res.status = jest.fn().mockReturnValue(res);
res.sendStatus = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);

describe("projectLinksController", () => {
  describe("addLink method", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should call projectLinksService.add when everything is ok", async () => {
      req.user = staticUser;
      req.params = { id: 1 };
      req.body = {
        platform: "GitHub",
        link: "TestLink",
      };

      await projectLinksController.addLink(req, res, jest.fn());

      expect(projectLinksService.add).toHaveBeenCalledWith(
        +req.params.id,
        req.body.platform,
        req.body.link,
        req.user
      );
    });
    it("should send a status 200 when everything is ok", async () => {
      req.user = staticUser;
      req.params = { id: 1 };
      req.body = {
        platform: "GitHub",
        link: "TestLink",
      };

      await projectLinksController.addLink(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("should pass all errors to middleware", async () => {
      (projectLinksService.add as jest.Mock).mockImplementationOnce(
        async () => {
          throw new ServerError("");
        }
      );
      req.user = staticUser;
      req.params = { id: 1 };
      req.body = {
        platform: "GitHub",
        link: "TestLink",
      };
      const nextMock = jest.fn();

      await projectLinksController.addLink(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });
    it("should throw UnauthorizedError when no user is specified in req.user", async () => {
      req.user = null;
      req.params = { id: 1 };
      req.body = {
        platform: "GitHub",
        link: "TestLink",
      };
      const nextMock = jest.fn();

      await projectLinksController.addLink(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(UnauthorizedError);
    });
    it("should throw BadRequestError when the 'platform' parameter is not specified", async () => {
      req.user = staticUser;
      req.params = { id: 1 };
      req.body = {
        link: "TestLink",
      };
      const nextMock = jest.fn();

      await projectLinksController.addLink(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });
    it("should throw BadRequestError when the 'link' parameter is not specified", async () => {
      req.user = staticUser;
      req.params = { id: 1 };
      req.body = {
        platform: "GitHub",
      };
      const nextMock = jest.fn();

      await projectLinksController.addLink(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });
  });
  describe("deleteLink method", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should call projectLinksService.deleteLink when everything is ok", async () => {
      req.user = staticUser;
      req.params = {
        id: 1,
        linkid: 2,
      };

      await projectLinksController.deleteLink(req, res, jest.fn());

      expect(projectLinksService.deleteLink).toHaveBeenCalledWith(
        +req.params.id,
        +req.params.linkid,
        req.user
      );
    });
    it("should send status 200 when everything is ok", async () => {
      req.user = staticUser;
      req.params = {
        id: 1,
        linkid: 2,
      };

      await projectLinksController.deleteLink(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("should pass all errors to middleware", async () => {
      (projectLinksService.deleteLink as jest.Mock).mockImplementationOnce(
        async () => {
          throw new ServerError("");
        }
      );
      req.user = staticUser;
      req.params = {
        id: 1,
        linkid: 2,
      };

      const nextMock = jest.fn();
      await projectLinksController.deleteLink(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });
    it("should throw an UnauthorizedError when no user is specified in req.user", async () => {
      req.user = null;
      req.params = {
        id: 1,
        linkid: 2,
      };

      const nextMock = jest.fn();
      await projectLinksController.deleteLink(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(UnauthorizedError);
    });
    it("should throw a BadRequestError when the 'id' param is not specified", async () => {
      req.user = staticUser;
      req.params = {
        linkid: 2,
      };

      const nextMock = jest.fn();
      await projectLinksController.deleteLink(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it("should throw a BadRequestError when the 'linkid' param is not specified", async () => {
      req.user = staticUser;
      req.params = {
        id: 1,
      };

      const nextMock = jest.fn();
      await projectLinksController.deleteLink(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });
  });
});

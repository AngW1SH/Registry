import userService from "@/services/user";
import userController from "..";
import { staticUser } from "@/entities/user";
import tokenService from "@/services/token";
import { BadRequestError, UnauthorizedError } from "@/helpers/errors";

const req: any = {};

const res: any = {
  send: jest.fn(),
  json: jest.fn(),
  status: jest.fn(function (responseStatus) {
    // This next line makes it chainable
    return this;
  }),
  cookie: jest.fn(),
};

jest.mock("@/services/user");
jest.mock("@/services/token");

describe("User Controller", () => {
  describe("getProjectStatusData method", () => {
    it("should throw an UnauthorizedError when no user is specified in req.user", async () => {
      req.user = undefined;
      const nextMock = jest.fn();
      await userController.getProjectStatusData(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(UnauthorizedError);
    });
    it("should throw a BadRequestError when no user is specified in req.user", async () => {
      req.user = staticUser;
      req.params = { projectId: undefined };
      const nextMock = jest.fn();
      await userController.getProjectStatusData(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });
    it("should send a json when everything is ok", async () => {
      req.params = { projectId: "1" };
      req.user = staticUser;
      await userController.getProjectStatusData(req, res, jest.fn());

      expect(res.json).toHaveBeenCalled();
    });

    it("should send a 200 status when everything is ok", async () => {
      req.params = { projectId: "1" };
      req.user = staticUser;
      await userController.getProjectStatusData(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should call userService.getProjectStatusData when everything is ok", async () => {
      req.params = { projectId: "1" };
      req.user = staticUser;
      await userController.getProjectStatusData(req, res, jest.fn());

      expect(userService.getProjectStatusData).toHaveBeenCalledWith(
        1,
        staticUser.id
      );
    });
  });

  describe("getData method", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should throw an Unauthorized error if no user is specified in req.user", async () => {
      req.user = undefined;

      const nextMock = jest.fn();
      await userController.getData(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(UnauthorizedError);
    });

    it("should send a json when everything is ok", async () => {
      req.user = staticUser;
      await userController.getData(req, res, jest.fn());

      expect(res.json).toHaveBeenCalled();
    });

    it("should send a 200 status when everything is ok", async () => {
      req.user = staticUser;
      await userController.getData(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should call userService.getData when everything is ok", async () => {
      req.user = staticUser;
      await userController.getData(req, res, jest.fn());

      expect(userService.getData).toHaveBeenCalledWith(staticUser);
    });
  });

  describe("getProfileData method", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should throw an Unauthorized error if no user is specified in req.user", async () => {
      req.user = undefined;

      const nextMock = jest.fn();
      await userController.getProfileData(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(UnauthorizedError);
    });

    it("should send a json when everything is ok", async () => {
      req.user = staticUser;
      await userController.getProfileData(req, res, jest.fn());

      expect(res.json).toHaveBeenCalled();
    });

    it("should send a 200 status when everything is ok", async () => {
      req.user = staticUser;
      await userController.getProfileData(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should call userService.getProfileData when everything is ok", async () => {
      req.user = staticUser;
      await userController.getProfileData(req, res, jest.fn());

      expect(userService.getProfileData).toHaveBeenCalledWith(staticUser);
    });
  });
});

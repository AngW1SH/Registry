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
  describe("authorize", () => {
    it("should write access- and refresh-tokens into cookies and remove redirect-url from cookies", async () => {
      req.user = staticUser;
      req.signedCookies = {};

      (tokenService.generate as jest.Mock).mockReturnValueOnce({
        accessToken: "1",
        refreshToken: "2",
      });

      const result = await userController.authorize(req, res, jest.fn());

      expect(res.cookie).toBeCalledTimes(3);
      expect(res.cookie).toHaveBeenCalledWith(
        "user-access",
        expect.anything(),
        expect.anything()
      );
      expect(res.cookie).toHaveBeenCalledWith(
        "user-refresh",
        expect.anything(),
        expect.anything()
      );
      expect(res.cookie).toHaveBeenCalledWith(
        "redirect-url",
        null,
        expect.anything()
      );
    });
  });

  describe("logout method", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should respond with a 200 status if everything is ok", async () => {
      req.signedCookies = {
        "user-access": "123",
        "user-refresh": "456",
      };

      const result = await userController.logout(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("should clear cookies if there is a user", async () => {
      req.signedCookies = {
        "user-access": "123",
        "user-refresh": "456",
      };

      const result = await userController.logout(req, res, jest.fn());

      expect(res.cookie).toHaveBeenCalledWith(
        "user-access",
        null,
        expect.anything()
      );
      expect(res.cookie).toHaveBeenCalledWith(
        "user-refresh",
        null,
        expect.anything()
      );
    });
    it("should call tokenService.deleteRefresh", async () => {
      await userController.logout(req, res, jest.fn());

      expect(tokenService.deleteRefresh).toHaveBeenCalledTimes(1);
      expect(tokenService.deleteRefresh).toHaveBeenCalledWith(
        req.signedCookies["user-refresh"]
      );
    });
  });

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

  describe("token method", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should set user-access cookie when everything is ok", async () => {
      req.signedCookies = { "user-refresh": "refresh-token" };
      (tokenService.refreshAccess as jest.Mock).mockResolvedValue(
        "new-access-token"
      );
      await userController.token(req, res, jest.fn());

      expect(res.cookie).toHaveBeenCalledWith(
        "user-access",
        "new-access-token",
        expect.anything()
      );
    });
    it("should send a 205 status when everything is ok", async () => {
      req.signedCookies = { "user-refresh": "refresh-token" };
      (tokenService.refreshAccess as jest.Mock).mockResolvedValue(
        "new-access-token"
      );
      await userController.token(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(205);
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

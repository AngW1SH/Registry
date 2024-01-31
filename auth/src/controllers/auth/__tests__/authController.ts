import { staticUser } from "@/entities/user";
import tokenService from "@/services/token";
import authController from "..";

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

describe("authController", () => {
  describe("authorize", () => {
    it("should write access- and refresh-tokens into cookies and remove redirect-url from cookies", async () => {
      req.user = staticUser;
      req.signedCookies = {};

      (tokenService.generate as jest.Mock).mockReturnValueOnce({
        accessToken: "1",
        refreshToken: "2",
      });

      const result = await authController.authorize(req, res, jest.fn());

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

      const result = await authController.logout(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("should clear cookies if there is a user", async () => {
      req.signedCookies = {
        "user-access": "123",
        "user-refresh": "456",
      };

      const result = await authController.logout(req, res, jest.fn());

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
      await authController.logout(req, res, jest.fn());

      expect(tokenService.deleteRefresh).toHaveBeenCalledTimes(1);
      expect(tokenService.deleteRefresh).toHaveBeenCalledWith(
        req.signedCookies["user-refresh"]
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
      await authController.token(req, res, jest.fn());

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
      await authController.token(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(205);
    });
  });
});

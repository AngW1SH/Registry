import userService from "@/services/user";
import userController from "..";
import { staticUser } from "@/entities/user";
import tokenService from "@/services/token";

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
    it("should write access- and refresh-tokens into cookies", async () => {
      req.user = staticUser;

      (tokenService.generate as jest.Mock).mockReturnValueOnce({
        accessToken: "1",
        refreshToken: "2",
      });

      const result = await userController.authorize(req, res, jest.fn());

      expect(res.cookie).toBeCalledTimes(2);
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

      expect(res.cookie).toBeCalled();
      expect(res.cookie).toBeCalledWith(
        expect.anything(),
        null,
        expect.anything()
      );
    });
  });
});

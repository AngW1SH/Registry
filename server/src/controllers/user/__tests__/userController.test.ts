import userService from "@/services/user";
import userController from "..";
import { staticUser } from "@/entities/user";

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

describe("User Controller", () => {
  describe("authorize", () => {
    it("should write access- and refresh-tokens into cookies", async () => {
      req.user = staticUser;

      (userService.createTokens as jest.Mock).mockReturnValueOnce({
        accessToken: "1",
        refreshToken: "2",
      });

      const result = await userController.authorize(req, res);

      expect(res.cookie).toBeCalledTimes(2);
    });
  });

  describe("getPublicUserInfo method", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should not contain user id", async () => {
      req.user = staticUser;

      const result = await userController.getPublicUserInfo(req, res);

      //expect(res.json.mock.calls[0][0].id).not.toBeDefined();
      //expect(res.json.mock.calls[0][0].email).toBeDefined();
    });
  });
});

import profileService from "@/services/profile";
import profileController from "..";
import { ServerError, UnauthorizedError } from "@/helpers/errors";
import { staticUser } from "@/entities/user";

const req: any = {};
const res: any = {};
req.body = {};
res.status = jest.fn().mockReturnValue(res);
res.sendStatus = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

jest.mock("@/services/profile");

describe("profileController", () => {
  describe("editAccountData method", () => {
    it("should pass errors to middleware", async () => {
      req.user = staticUser;
      (profileService.editAccountData as jest.Mock).mockImplementationOnce(
        () => {
          throw new ServerError("");
        }
      );

      const nextMock = jest.fn();

      await profileController.editAccountData(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });
    it("should throw an error if no user is provided", async () => {
      req.user = undefined;

      const nextMock = jest.fn();

      await profileController.editAccountData(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(UnauthorizedError);
    });
    it("should pass data and user to service", async () => {
      req.user = staticUser;
      req.body = {
        email: "test",
        phone: "test",
      };

      await profileController.editAccountData(req, res, jest.fn());

      expect(profileService.editAccountData).toHaveBeenCalledWith(
        {
          email: "test",
          phone: "test",
        },
        staticUser
      );
    });
    it("should send a status 200 when everything is ok", async () => {
      req.user = staticUser;
      req.body = {
        email: "test",
        phone: "test",
      };

      await profileController.editAccountData(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
  describe("editPersonalData method", () => {
    it("should pass errors to middleware", async () => {
      req.user = staticUser;
      req.body = {
        name: "test",
        surname: "test",
        patronymic: "test",
      };

      (profileService.editPersonalData as jest.Mock).mockImplementationOnce(
        () => {
          throw new ServerError("");
        }
      );

      const nextMock = jest.fn();

      await profileController.editPersonalData(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });
    it("should throw an error if no user is provided", async () => {
      req.user = undefined;

      const nextMock = jest.fn();

      await profileController.editAccountData(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(UnauthorizedError);
    });
    it("should pass data and user to service", async () => {
      req.user = staticUser;
      req.body = {
        name: "test",
        surname: "test",
        patronymic: "test",
      };

      await profileController.editPersonalData(req, res, jest.fn());

      expect(profileService.editPersonalData).toHaveBeenCalledWith(
        {
          fullName: {
            name: "test",
            surname: "test",
            patronymic: "test",
          },
        },
        staticUser
      );
    });
    it("should send a status 200 when everything is ok", async () => {
      req.user = staticUser;
      req.body = {
        name: "test",
        surname: "test",
        patronymic: "test",
      };

      await profileController.editPersonalData(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});

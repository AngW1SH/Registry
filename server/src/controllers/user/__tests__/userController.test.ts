import userService from "@/services/user";
import userController from "..";
import { staticUser } from "@/entities/user";
import {
  BadRequestError,
  ServerError,
  UnauthorizedError,
} from "@/helpers/errors";
import projectStatusService from "@/services/project-status";
import profileService from "@/services/profile";
import formResultService from "@/services/form-result";

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
jest.mock("@/services/project-status");
jest.mock("@/services/profile");
jest.mock("@/services/form-result");

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

    it("should call projectStatusService.getAssignableTeams when everything is ok", async () => {
      req.params = { projectId: "1" };
      req.user = staticUser;
      await userController.getProjectStatusData(req, res, jest.fn());

      expect(projectStatusService.getAssignableTeams).toHaveBeenCalledWith(
        1,
        staticUser.id
      );
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

    it("should call profileService.getUserData when everything is ok", async () => {
      req.user = staticUser;
      await userController.getProfileData(req, res, jest.fn());

      expect(profileService.getUserData).toHaveBeenCalledWith(staticUser);
    });
  });

  describe("submitForm method", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should pass errors to middleware", async () => {
      process.env.SUBMIT_FORM_TOKEN = "test";

      (formResultService.submit as jest.Mock).mockImplementationOnce(() => {
        throw new ServerError("");
      });
      req.headers = {
        authorization: "bearer: test",
      };
      req.body = {
        form: { id: "123" },
        response: { data: {} },
      };

      const nextMock = jest.fn();

      await userController.submitForm(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });
    it("should throw unauthorized error if token is invalid", async () => {
      process.env.SUBMIT_FORM_TOKEN = "test";

      req.headers = {
        authorization: "bearer: invalid",
      };

      const nextMock = jest.fn();

      await userController.submitForm(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(UnauthorizedError);
    });

    it("should throw a BadRequestError when the form is not specified", async () => {
      process.env.SUBMIT_FORM_TOKEN = "test";

      req.headers = {
        authorization: "bearer: test",
      };
      req.body = {
        response: { data: {} },
      };

      let nextMock = jest.fn();
      await userController.submitForm(req, res, nextMock);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);

      nextMock = jest.fn();
      req.body = {
        form: { id: "123" },
      };
      await userController.submitForm(req, res, nextMock);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it("should call formResultService.submit when everything is ok", async () => {
      process.env.SUBMIT_FORM_TOKEN = "test";

      req.headers = {
        authorization: "bearer: test",
      };
      req.body = {
        form: { id: "123" },
        response: { data: {} },
      };

      await userController.submitForm(req, res, jest.fn());
      expect(formResultService.submit).toHaveBeenCalledWith("123", {});
    });
  });
});

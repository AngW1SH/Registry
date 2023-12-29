import {
  BadRequestError,
  ServerError,
  UnauthorizedError,
} from "@/helpers/errors";
import memberService from "@/services/member";
import memberController from "..";
import { staticUser } from "@/entities/user";
import { staticMembers } from "@/entities/member";

jest.mock("@/services/member");

const req: any = {};
const res: any = {};
req.body = {};
res.status = jest.fn().mockReturnValue(res);
res.sendStatus = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);

describe("memberController", () => {
  describe("edit method", () => {
    it("should call memberService.edit when everything is ok", async () => {
      req.user = staticUser;
      req.method = "PUT";
      req.body = {
        member: staticMembers[0],
      };

      const nextMock = jest.fn();

      await memberController.edit(req, res, nextMock);

      expect(memberService.edit).toHaveBeenCalledWith(
        req.body.member,
        req.user
      );
    });
    it("should pass errors to middleware", async () => {
      (memberService.edit as jest.Mock).mockImplementationOnce(() => {
        throw new ServerError("");
      });
      req.user = staticUser;
      req.method = "PUT";
      req.body = {
        member: staticMembers[0],
      };

      const nextMock = jest.fn();

      await memberController.edit(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });
    it("should throw an UnauthorizedError when no user is specified in req.user", async () => {
      req.user = null;
      req.method = "PUT";
      req.body = {
        member: staticMembers[0],
      };

      const nextMock = jest.fn();

      await memberController.edit(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(UnauthorizedError);
    });
    it("should throw a BadRequestError when the method is not PUT", async () => {
      req.user = staticUser;
      req.body = {
        member: staticMembers[0],
      };

      const nextMock = jest.fn();

      req.method = "DELETE";
      await memberController.edit(req, res, nextMock);

      req.method = "GET";
      await memberController.edit(req, res, nextMock);

      req.method = "POST";
      await memberController.edit(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
      expect(nextMock.mock.calls[1][0]).toBeInstanceOf(BadRequestError);
      expect(nextMock.mock.calls[2][0]).toBeInstanceOf(BadRequestError);
    });
    it("should throw a BadRequestError when the member is not specified", async () => {
      req.user = staticUser;
      req.method = "PUT";
      req.body = {};

      const nextMock = jest.fn();

      await memberController.edit(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });
  });
});

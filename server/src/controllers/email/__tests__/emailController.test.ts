import { BadRequestError, ServerError } from "@/helpers/errors";
import emailController from "..";
import emailService from "@/services/email";

jest.mock("@/services/email");

const req: any = {};
const res: any = {};
req.body = {};
res.status = jest.fn().mockReturnValue(res);
res.sendStatus = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);
req.method = "POST";

describe("emailController", () => {
  describe("send method", () => {
    it("should pass errors to middleware", async () => {
      (emailService.send as jest.Mock).mockImplementationOnce(() => {
        throw new ServerError("");
      });

      req.body = {
        name: "test",
        email: "test",
      };

      const nextMock = jest.fn();

      await emailController.send(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });

    it("should throw an BadRequestError if the method is not POST", async () => {
      req.method = "GET";

      const nextMock = jest.fn();

      await emailController.send(req, res, nextMock);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it("should throw a BadRequestError if the name is not specified", async () => {
      req.method = "POST";
      req.body = {
        email: "test",
      };

      const nextMock = jest.fn();

      await emailController.send(req, res, nextMock);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it("should throw a BadRequestError if the email is not specified", async () => {
      req.method = "POST";
      req.body = {
        name: "test",
      };

      const nextMock = jest.fn();

      await emailController.send(req, res, nextMock);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it("should call emailService.send", async () => {
      req.method = "POST";
      req.body = {
        name: "test",
        email: "test",
      };

      await emailController.send(req, res, jest.fn());
      expect(emailService.send).toHaveBeenCalled();
      expect(emailService.send).toHaveBeenCalledWith({
        name: "test",
        email: "test",
      });
    });

    it("should send a status 200 when everything is ok", async () => {
      req.method = "POST";
      req.body = {
        name: "test",
        email: "test",
      };

      await emailController.send(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});

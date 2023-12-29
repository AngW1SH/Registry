import tagService from "@/services/tag";
import tagController from "..";
import { BadRequestError, ServerError } from "@/helpers/errors";

jest.mock("@/services/tag");
const req: any = {};
const res: any = {};
req.body = {};
req.params = {};
res.status = jest.fn().mockReturnValue(res);
res.sendStatus = jest.fn().mockReturnValue(res);
res.send = jest.fn();
res.json = jest.fn().mockReturnValue(res);

describe("tagController", () => {
  describe("findInFilters method", () => {
    it("should call tagService.findInFilters when everything is ok", async () => {
      req.method = "GET";
      req.params = {
        query: "test",
      };

      await tagController.findInFilters(req, res, jest.fn());
      expect(tagService.findInFilters).toHaveBeenCalledWith("test");
    });
    it("should send a status 200 when everything is ok", async () => {
      req.method = "GET";
      req.params = {
        query: "test",
      };

      await tagController.findInFilters(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("should send the result of tagService.findInFilters", async () => {
      (tagService.findInFilters as jest.Mock).mockReturnValueOnce("testreturn");
      req.method = "GET";
      req.params = {
        query: "test",
      };

      await tagController.findInFilters(req, res, jest.fn());
      expect(res.send).toHaveBeenCalledWith("testreturn");
    });
    it("should pass all errors to middleware", async () => {
      (tagService.findInFilters as jest.Mock).mockImplementationOnce(() => {
        throw new ServerError("");
      });
      req.method = "GET";
      req.params = {
        query: "test",
      };
      const nextMock = jest.fn();

      await tagController.findInFilters(req, res, nextMock);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });
    it("should throw a BadRequestError when the method is neither GET nor POST", async () => {
      req.params = {
        query: "test",
      };
      const nextMock = jest.fn();

      req.method = "DELETE";
      await tagController.findInFilters(req, res, nextMock);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);

      req.method = "PUT";
      await tagController.findInFilters(req, res, nextMock);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });
  });
});

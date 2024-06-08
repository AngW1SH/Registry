import { BadRequestError, ServerError } from "@/helpers/errors";
import userRoleService from "@/services/user-role";
import userRoleController from "..";

jest.mock("@/services/user-role");

const req: any = {};
const res: any = {};
req.body = {};
res.status = jest.fn().mockReturnValue(res);
res.sendStatus = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);
req.method = "GET";

describe("userRoleController", () => {
  describe("findInFilters method", () => {
    it("should pass errors to middleware", async () => {
      req.params = { query: "test" };
      (userRoleService.findInFilters as jest.Mock).mockImplementationOnce(
        () => {
          throw new ServerError("");
        }
      );

      const nextMock = jest.fn();

      await userRoleController.findInFilters(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });

    it("should throw BadRequestError if method is not POST or GET", async () => {
      req.method = "DELETE";
      const nextMock = jest.fn();

      await userRoleController.findInFilters(req, res, nextMock);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it("should call userRoleService.findInFilters", async () => {
      req.params = { query: "test" };
      req.method = "GET";
      await userRoleController.findInFilters(req, res, jest.fn());
      expect(userRoleService.findInFilters).toHaveBeenCalled();
      expect(userRoleService.findInFilters).toHaveBeenCalledWith(
        req.params.query
      );
    });

    it("should send a status 200 when everything is ok", async () => {
      req.params = { query: "test" };
      req.method = "GET";
      await userRoleController.findInFilters(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});

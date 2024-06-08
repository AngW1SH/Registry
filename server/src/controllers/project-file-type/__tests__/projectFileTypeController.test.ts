import { ServerError } from "@/helpers/errors";
import projectFileTypeService from "@/services/project-file-type";
import projectFileTypeController from "..";

jest.mock("@/services/project-file-type");
const req: any = {};
const res: any = {};
req.body = {};
res.status = jest.fn().mockReturnValue(res);
res.sendStatus = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);

describe("projectFileTypeController", () => {
  describe("findAll method", () => {
    it("should pass errors to middleware", async () => {
      (projectFileTypeService.findAll as jest.Mock).mockImplementationOnce(
        () => {
          throw new ServerError("");
        }
      );

      const nextMock = jest.fn();

      await projectFileTypeController.findAll(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });

    it("should call projectFileTypeService.findAll", async () => {
      await projectFileTypeController.findAll(req, res, jest.fn());
      expect(projectFileTypeService.findAll).toHaveBeenCalled();
    });

    it("should send a status 200 when everything is ok", async () => {
      await projectFileTypeController.findAll(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("findOne method", () => {
    it("should pass errors to middleware", async () => {
      (projectFileTypeService.findOne as jest.Mock).mockImplementationOnce(
        () => {
          throw new ServerError("");
        }
      );

      const nextMock = jest.fn();

      await projectFileTypeController.findOne(req, res, nextMock);
    });

    it("should call projectFileTypeService.findOne", async () => {
      req.params = { id: "1" };
      await projectFileTypeController.findOne(req, res, jest.fn());
      expect(projectFileTypeService.findOne).toHaveBeenCalled();
      expect(projectFileTypeService.findOne).toHaveBeenCalledWith(1);
    });

    it("should send a status 200 when everything is ok", async () => {
      req.params = { id: "1" };
      await projectFileTypeController.findOne(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});

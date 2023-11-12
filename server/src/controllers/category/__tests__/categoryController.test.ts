import { ServerError } from "@/helpers/errors";
import categoryService from "@/services/category";
import categoryController from "..";

jest.mock("@/services/category");

const req: any = {};
const res: any = {};
req.body = {};
res.status = jest.fn().mockReturnValue(res);
res.sendStatus = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);

describe("Category Controller", () => {
  describe("getFeatured method", () => {
    it("should pass errors to middleware", async () => {
      (categoryService.getFeatured as jest.Mock).mockImplementationOnce(() => {
        throw new ServerError("");
      });

      const nextMock = jest.fn();

      await categoryController.getFeatured(req, res, nextMock);

      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ServerError);
    });
  });
});

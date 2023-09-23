import projectController from "..";

const req: any = {};
const res: any = {};
res.status = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);

describe("Project Controller", () => {
  describe("getActive method", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });
    it("should send a json", async () => {
      await projectController.getActive(req, res);

      expect(res.json).toHaveBeenCalled();
    });

    it("should send a 200 status", async () => {
      await projectController.getActive(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("findMany method", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });
    it("should send a json", async () => {
      await projectController.getActive(req, res);

      expect(res.json).toHaveBeenCalled();
    });

    it("should send a 200 status", async () => {
      await projectController.getActive(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});

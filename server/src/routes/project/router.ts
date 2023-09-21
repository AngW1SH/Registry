import projectController from "@/controllers/project";
import express, { Request, Response } from "express";

const projectRouter = express();

projectRouter.get("/active", (req: Request, res: Response) => {
  try {
    projectController.getActive(req, res);
  } catch (err) {
    res.status(500).send();
  }
});

projectRouter.post("/active", (req: Request, res: Response) => {
  try {
    projectController.getActive(req, res);
  } catch (err) {
    res.status(500).send();
  }
});

projectRouter.get("/new", (req: Request, res: Response) => {
  try {
    projectController.getNew(req, res);
  } catch (err) {
    res.status(500).send();
  }
});

export default projectRouter;

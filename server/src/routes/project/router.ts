import projectController from "@/controllers/project";
import express, { Request, Response } from "express";

const projectRouter = express();

projectRouter.get("/active", (req: Request, res: Response) => {
  try {
    projectController.getActive(req, res);
  } catch (err) {
    res.sendStatus(500);
  }
});

projectRouter.post("/active", (req: Request, res: Response) => {
  try {
    projectController.getActive(req, res);
  } catch (err) {
    res.sendStatus(500);
  }
});

projectRouter.get("/new", (req: Request, res: Response) => {
  try {
    projectController.getNew(req, res);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default projectRouter;

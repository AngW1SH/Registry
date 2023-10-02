import projectController from "@/controllers/project";
import express, { Request, Response } from "express";

const projectRouter = express();

projectRouter.get("/active", projectController.getActive);

projectRouter.post("/active", projectController.getActive);

projectRouter.get("/new", projectController.getNew);

projectRouter.get("/findmany", projectController.findMany);
projectRouter.post("/findmany", projectController.findMany);

export default projectRouter;

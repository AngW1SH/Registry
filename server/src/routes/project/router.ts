import projectController from "@/controllers/project";
import express, { Request, Response } from "express";

const projectRouter = express();

projectRouter.get("/active", projectController.getActive);

projectRouter.post("/active", projectController.getActive);

projectRouter.get("/new", projectController.getNew);
projectRouter.get("/new", projectController.getNew);

projectRouter.get("/findbyid/:id", projectController.findById);
projectRouter.post("/findbyid", projectController.findById);

projectRouter.get("/findmany", projectController.findMany);
projectRouter.post("/findmany", projectController.findMany);

export default projectRouter;

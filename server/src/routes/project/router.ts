import projectController from "@/controllers/project";
import express, { Request, Response } from "express";
import projectResultsRouter from "./results/router";
import projectLinksRouter from "./links/router";
import projectFileTypeRouter from "./file-type/router";

const projectRouter = express();

projectRouter.use("/:id/result-files", projectResultsRouter);
projectRouter.use("/:id/link", projectLinksRouter);
projectRouter.use("/file-type", projectFileTypeRouter);

projectRouter.get("/active", projectController.getActive);

projectRouter.post("/active", projectController.getActive);

projectRouter.get("/new", projectController.getNew);

projectRouter.post("/", projectController.findById);

projectRouter.get("/findmany", projectController.findMany);
projectRouter.post("/findmany", projectController.findMany);

projectRouter.get("/:id", projectController.findById);

export default projectRouter;

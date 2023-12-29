import projectController from "@/controllers/project";
import passport from "@/middleware/passport";
import express, { Request, Response } from "express";
import projectResultsRouter from "./results/router";
import projectLinksRouter from "./links/router";

const projectRouter = express();

projectRouter.get("/active", projectController.getActive);

projectRouter.post("/active", projectController.getActive);

projectRouter.get("/new", projectController.getNew);
projectRouter.get("/new", projectController.getNew);

projectRouter.get("/:id", projectController.findById);
projectRouter.post("/", projectController.findById);

projectRouter.get("/findmany", projectController.findMany);
projectRouter.post("/findmany", projectController.findMany);

projectRouter.use("/:id/result-files", projectResultsRouter);
projectRouter.use("/:id/link", projectLinksRouter);

export default projectRouter;

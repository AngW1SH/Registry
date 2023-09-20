import projectController from "@/controllers/project";
import express from "express";

const projectRouter = express();

projectRouter.get("/create", projectController.create);

export default projectRouter;

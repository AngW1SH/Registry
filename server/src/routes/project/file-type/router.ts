import express from "express";
import projectFileTypeController from "@/controllers/project-file-type";

const projectFileTypeRouter = express.Router();

projectFileTypeRouter.get("/", projectFileTypeController.findAll);

projectFileTypeRouter.get("/:id", projectFileTypeController.findOne);

export default projectFileTypeRouter;

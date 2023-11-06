import projectController from "@/controllers/project";
import passport from "@/middleware/passport";
import express, { Request, Response } from "express";

const projectRouter = express();

projectRouter.get("/active", projectController.getActive);

projectRouter.post("/active", projectController.getActive);

projectRouter.get("/new", projectController.getNew);
projectRouter.get("/new", projectController.getNew);

projectRouter.get("/:id", projectController.findById);
projectRouter.post("/", projectController.findById);

projectRouter.get("/findmany", projectController.findMany);
projectRouter.post("/findmany", projectController.findMany);

projectRouter.put(
  "/result-files/",
  passport.authenticate("jwt-authenticate"),
  projectController.uploadResultFiles
);

projectRouter.delete(
  "/:id/result-files/:fileid",
  passport.authenticate("jwt-authenticate"),
  projectController.deleteResultFile
);

projectRouter.post(
  "/:id/result-files/",
  passport.authenticate("jwt-authenticate"),
  projectController.uploadResultFiles
);

export default projectRouter;

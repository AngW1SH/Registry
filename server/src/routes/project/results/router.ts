import express from "express";
import passport from "@/middleware/passport";
import projectResultsController from "@/controllers/project-results";

const projectResultsRouter = express.Router({ mergeParams: true });

projectResultsRouter.put(
  "/:fileid",
  passport.authenticate("jwt-authenticate"),
  projectResultsController.changeFile
);

projectResultsRouter.delete(
  "/:fileid",
  passport.authenticate("jwt-authenticate"),
  projectResultsController.deleteFile
);

projectResultsRouter.post(
  "/",
  passport.authenticate("jwt-authenticate"),
  projectResultsController.uploadFile
);

export default projectResultsRouter;

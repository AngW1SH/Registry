import express from "express";
import passport from "@/middleware/passport";
import projectLinksController from "@/controllers/project-links";

const projectLinksRouter = express.Router({ mergeParams: true });

projectLinksRouter.post(
  "/",
  passport.authenticate("jwt-authenticate"),
  projectLinksController.addLink
);

projectLinksRouter.delete(
  "/:linkid",
  passport.authenticate("jwt-authenticate"),
  projectLinksController.deleteLink
);

export default projectLinksRouter;

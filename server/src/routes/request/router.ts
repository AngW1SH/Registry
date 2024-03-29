import projectController from "@/controllers/project";
import express, { Request, Response } from "express";
import passport from "@/middleware/passport";
import requestController from "@/controllers/request";

const requestRouter = express();

requestRouter.post(
  "/",
  passport.authenticate("jwt-authenticate"),
  requestController.add
);

requestRouter.put(
  "/",
  passport.authenticate("jwt-authenticate"),
  requestController.edit
);

requestRouter.get(
  "/available",
  passport.authenticate("jwt-authenticate"),
  requestController.getAvailable
);

requestRouter.delete(
  "/:id",
  passport.authenticate("jwt-authenticate"),
  requestController.deleteOne
);

export default requestRouter;

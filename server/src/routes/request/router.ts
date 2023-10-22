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

export default requestRouter;
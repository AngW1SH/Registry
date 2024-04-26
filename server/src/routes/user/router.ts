import express, { NextFunction, Request, Response } from "express";
import passport from "@/middleware/passport";
import userController from "@/controllers/user";
import { strapi } from "@/db/strapi/client";
import userRoleRouter from "./role/router";

const userRouter = express();

userRouter.use("/role", userRoleRouter);

userRouter.get(
  "/projectstatus/:projectId",
  passport.authenticate("jwt-authenticate"),
  userController.getProjectStatusData
);

userRouter.get(
  "/profile",
  passport.authenticate("jwt-authenticate"),
  userController.getProfileData
);

userRouter.get(
  "/",
  passport.authenticate("jwt-authenticate"),
  userController.getUser
);

userRouter.post("/form", userController.submitForm);

export default userRouter;

import express, { Request, Response } from "express";
import passport from "@/middleware/passport";
import jwt, { JwtPayload } from "jsonwebtoken";
import userRepository from "@/repositories/user";
import { generateAccessToken } from "@/helpers/jwt";
import userController from "@/controllers/user";

const userRouter = express();

userRouter.get(
  "/yandeexcallback",
  passport.authenticate("custom-yandex", { failureRedirect: "/login" }),
  userController.authorize
);

userRouter.get("/try", passport.authenticate("custom-yandex"));

userRouter.get("/token", userController.token);

userRouter.get(
  "/projectinfo/:projectId",
  passport.authenticate("jwt-authenticate"),
  userController.getUserProjectInfo
);

userRouter.get(
  "/info",
  passport.authenticate("jwt-authenticate"),
  userController.getPublicUserInfo
);

export default userRouter;

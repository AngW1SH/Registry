import express, { NextFunction, Request, Response } from "express";
import passport from "@/middleware/passport";
import userController from "@/controllers/user";
import { strapi } from "@/db/strapi/client";

const userRouter = express();

userRouter.get(
  "/yandeexcallback",
  passport.authenticate("sso-strategy", { failureRedirect: "/" }),
  userController.authorize
);

userRouter.get(
  "/authenticate",
  (req: Request, res: Response, next: NextFunction) => {
    res.cookie("redirect-url", req.headers.referer, {
      signed: true,
    });
    next();
  },
  passport.authenticate("sso-strategy")
);

userRouter.get("/token", userController.token);

userRouter.get(
  "/projectstatus/:projectId",
  passport.authenticate("jwt-authenticate"),
  userController.getProjectStatusData
);

userRouter.get(
  "/data",
  passport.authenticate("jwt-authenticate"),
  userController.getData
);

userRouter.get("/logout", userController.logout);

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

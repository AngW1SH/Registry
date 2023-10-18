import express, { NextFunction, Request, Response } from "express";
import passport from "@/middleware/passport";
import userController from "@/controllers/user";

const userRouter = express();

userRouter.get(
  "/yandeexcallback",
  passport.authenticate("custom-yandex", { failureRedirect: "/login" }),
  userController.authorize
);

userRouter.get(
  "/try",
  (req: Request, res: Response, next: NextFunction) => {
    res.cookie("redirect-url", req.headers.referer, {
      signed: true,
    });
    next();
  },
  passport.authenticate("custom-yandex")
);

userRouter.get("/token", userController.token);

userRouter.get(
  "/projectstatus/:projectId",
  passport.authenticate("jwt-authenticate"),
  userController.getProjectStatusData
);

userRouter.get(
  "/info",
  passport.authenticate("jwt-authenticate"),
  userController.getPublicUserInfo
);

userRouter.get(
  "/data",
  passport.authenticate("jwt-authenticate"),
  userController.getData
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt-authenticate"),
  userController.logout
);

export default userRouter;

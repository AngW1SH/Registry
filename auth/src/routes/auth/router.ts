import express, { NextFunction, Request, Response } from "express";
import passport from "@/middleware/passport";
import authController from "@/controllers/auth";

const authRouter = express();

authRouter.get(
  "/ssocallback",
  passport.authenticate("sso-strategy", { failureRedirect: "/" }),
  authController.authorize
);

authRouter.get(
  "/authenticate",
  (req: Request, res: Response, next: NextFunction) => {
    res.cookie("redirect-url", req.headers.referer, {
      signed: true,
    });
    next();
  },
  passport.authenticate("sso-strategy")
);

authRouter.get("/token", authController.token);

authRouter.get("/logout", authController.logout);

export default authRouter;

import { UnauthorizedError } from "@/helpers/errors";
import tokenService from "@/services/token";
import { NextFunction, Request, Response } from "express";

const authControllerFactory = () => {
  return Object.freeze({ authorize, logout, token });

  async function authorize(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in userController.authorize"
        );

      const { accessToken, refreshToken } = await tokenService.generate(
        req.user.id
      );

      res.cookie("user-access", accessToken, {
        maxAge: 1000 * 60 * 60, // expires after an hour
        httpOnly: true,
        signed: true,
      });

      res.cookie("user-refresh", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 10, // expires after 10 days
        httpOnly: true,
        signed: true,
      });

      const redirectUrl = req.signedCookies["redirect-url"] || "/";
      res.cookie("redirect-url", null, {
        maxAge: 0,
        httpOnly: true,
        signed: true,
      });
      res.redirect(redirectUrl);
    } catch (err) {
      next(err);
    }
  }

  async function logout(req: Request, res: Response, next: NextFunction) {
    try {
      await tokenService.deleteRefresh(req.signedCookies["user-refresh"]);

      res.cookie("user-access", null, {
        maxAge: 0,
        httpOnly: true,
        signed: true,
      });
      res.cookie("user-refresh", null, {
        maxAge: 0,
        httpOnly: true,
        signed: true,
      });
      res.status(200).send();
    } catch (err) {
      res.cookie("user-access", null, {
        maxAge: 0,
        httpOnly: true,
        signed: true,
      });
      res.cookie("user-refresh", null, {
        maxAge: 0,
        httpOnly: true,
        signed: true,
      });

      next(err);
    }
  }

  async function token(req: Request, res: Response, next: NextFunction) {
    try {
      const newAccessToken = await tokenService.refreshAccess(
        req.signedCookies["user-refresh"]
      );

      res.cookie("user-access", newAccessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        signed: true,
      });

      return res.status(205).send();
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        res.clearCookie("user-access");
        res.clearCookie("user-refresh");
      }
      next(err);
    }
  }
};

const authController = authControllerFactory();

export default authController;

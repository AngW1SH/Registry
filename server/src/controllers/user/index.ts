import { generateAccessToken } from "@/helpers/jwt";
import tokenRepository from "@/repositories/token";
import tokenService from "@/services/token";
import userService from "@/services/user";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const userControllerFactory = () => {
  return Object.freeze({
    authorize,
    logout,
    token,
    getProjectStatusData,
    getUser,
    getData,
    submitForm,
    getProfileData,
  });

  async function authorize(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).send();

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
      res.status(500).send(err);
    }
  }

  async function logout(req: Request, res: Response) {
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
      res.status(500).send(err);
    }
  }

  async function getProjectStatusData(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).send();
      if (!req.params.projectId) return res.status(400).send();

      const info = await userService.getProjectStatusData(
        +req.params.projectId,
        req.user.id
      );

      res.status(200).json(info);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async function token(req: Request, res: Response) {
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
    } catch (err: any) {
      if (err.message == "Unauthorized") {
        res.clearCookie("user-access");
        res.clearCookie("user-refresh");
        return res.status(401).send();
      }
      res.status(500).send();
    }
  }

  async function getData(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).send();

      const result = await userService.getData(req.user);

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async function submitForm(req: Request, res: Response) {
    try {
      if (!req.body || !req.body.form || !req.body.response)
        return res.status(400).send();
      const result = userService.submitForm(
        JSON.parse(req.body.form).id,
        JSON.parse(req.body.response).data
      );
      res.status(200).send();
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async function getProfileData(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).send();

      const result = await userService.getProfileData(req.user);

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async function getUser(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).send();

      res.status(200).send(req.user);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const userController = userControllerFactory();

export default userController;

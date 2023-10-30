import { BadRequestError, UnauthorizedError } from "@/helpers/errors";
import { generateAccessToken } from "@/helpers/jwt";
import tokenRepository from "@/repositories/token";
import formService from "@/services/form";
import tokenService from "@/services/token";
import userService from "@/services/user";
import { NextFunction, Request, Response } from "express";
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
  }

  async function logout(req: Request, res: Response) {
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
  }

  async function getProjectStatusData(req: Request, res: Response) {
    if (!req.user)
      throw new UnauthorizedError(
        "req.user not specified in userController.getProjectStatusData"
      );

    if (!req.params.projectId)
      throw new BadRequestError("Missing project identifier");

    const info = await userService.getProjectStatusData(
      +req.params.projectId,
      req.user.id
    );

    res.status(200).json(info);
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

  async function getData(req: Request, res: Response) {
    if (!req.user) throw new UnauthorizedError("req.user not specified");

    const result = await userService.getData(req.user);

    res.status(200).send(result);
  }

  async function submitForm(req: Request, res: Response) {
    if (!req.body.form)
      throw new BadRequestError("Missing required body parameter: form");
    if (!req.body.response)
      throw new BadRequestError("Missing required body parameter: response");

    const form = JSON.parse(req.body.form);
    const response = JSON.parse(req.body.response);

    if (!form.hasOwnProperty("id"))
      throw new BadRequestError("Form must have an identificator");
    if (!response.hasOwnProperty("data"))
      throw new BadRequestError("Response must have a body");

    const result = formService.submit(form.id, response.data);
    res.status(200).send();
  }

  async function getProfileData(req: Request, res: Response) {
    if (!req.user) throw new UnauthorizedError("req.user not specified");

    const result = await userService.getProfileData(req.user);

    res.status(200).send(result);
  }

  async function getUser(req: Request, res: Response) {
    if (!req.user) throw new UnauthorizedError("req.user not specified");

    res.status(200).send(req.user);
  }
};

const userController = userControllerFactory();

export default userController;

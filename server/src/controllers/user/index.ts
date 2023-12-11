import { BadRequestError, UnauthorizedError } from "@/helpers/errors";
import formResultService from "@/services/form-result";
import tokenService from "@/services/token";
import userService from "@/services/user";
import { NextFunction, Request, Response } from "express";

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

  async function getProjectStatusData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
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
    } catch (err) {
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

  async function getData(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new UnauthorizedError("req.user not specified");

      const result = await userService.getData(req.user);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async function submitForm(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.form)
        throw new BadRequestError("Missing required body parameter: form");
      if (!req.body.response)
        throw new BadRequestError("Missing required body parameter: response");

      const form = req.body.form;
      const response = req.body.response;

      if (!form.hasOwnProperty("id"))
        throw new BadRequestError("Form must have an identificator");
      if (!response.hasOwnProperty("data"))
        throw new BadRequestError("Response must have a body");

      const result = formResultService.submit(form.id, response.data);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  }

  async function getProfileData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) throw new UnauthorizedError("req.user not specified");

      const result = await userService.getProfileData(req.user);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new UnauthorizedError("req.user not specified");

      res.status(200).send(req.user);
    } catch (err) {
      next(err);
    }
  }
};

const userController = userControllerFactory();

export default userController;

import { generateAccessToken } from "@/helpers/jwt";
import userService from "@/services/user";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const userControllerFactory = () => {
  return Object.freeze({
    authorize,
    logout,
    token,
    getPublicUserInfo,
    getProjectStatusData,
    getData,
    submitForm,
  });

  async function authorize(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).send();

      const { accessToken, refreshToken } = await userService.createTokens(
        req.user
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

      console.log(req.signedCookies["redirect-url"]);

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

  async function getPublicUserInfo(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).send();

      const info = await userService.getPublicUserInfo(req.user);

      res.status(200).json(info);
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
        req.user.id,
        req.user
      );

      res.status(200).json(info);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async function token(req: Request, res: Response) {
    try {
      jwt.verify(
        req.signedCookies["user-access"], // In case multiple /token requests are sent at the same time
        process.env.TOKEN_SECRET,
        async (
          err: jwt.VerifyErrors | null,
          decoded: jwt.Jwt | JwtPayload | string | undefined
        ) => {
          if (!err) return res.status(200).send();
          jwt.verify(
            req.signedCookies["user-refresh"],
            process.env.TOKEN_SECRET!,
            async (
              err: jwt.VerifyErrors | null,
              decoded: jwt.Jwt | JwtPayload | string | undefined
            ) => {
              if (err) {
                res.status(401).send();
              } else {
                const doesUserExist = await userService.findById(
                  (decoded as JwtPayload).id
                );

                if (doesUserExist) {
                  const newToken = generateAccessToken(doesUserExist.id);
                  res.clearCookie("user-access");
                  res.cookie("user-access", newToken, {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true,
                    signed: true,
                  });
                  return res.status(205).send();
                } else {
                  res.clearCookie("user-access");
                  res.clearCookie("user-refresh");
                  return res.status(401).send();
                }
              }
            }
          );
        }
      );
    } catch (err) {
      res.status(500).send(err);
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
};

const userController = userControllerFactory();

export default userController;

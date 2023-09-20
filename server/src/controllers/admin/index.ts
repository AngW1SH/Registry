import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import adminService from "@/services/admin";

const adminControllerFactory = () => {
  return Object.freeze({
    unauthorize,
    updateAccessToken,
    generateHash,
    createTokens,
  });

  async function createTokens(req: Request, res: Response) {
    if (!req.user) return res.status(401).send();

    const { accessToken, refreshToken } = await adminService.createTokens(
      req.user
    );

    res.cookie("admin-access", accessToken, {
      maxAge: 1000 * 60 * 60, // expires after an hour
      httpOnly: true,
      signed: true,
    });

    res.cookie("admin-refresh", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 10, // expires after 10 days
      httpOnly: true,
      signed: true,
    });

    res.status(200).send();
  }

  async function generateHash(req: Request, res: Response) {
    const hash = await adminService.hashPassword(req.params.word);
    res.status(200).json({ hash: hash });
  }

  async function unauthorize(req: Request, res: Response) {
    res.cookie("admin-access", null, {
      maxAge: 0,
      httpOnly: true,
      signed: true,
    });
    res.cookie("admin-refresh", null, {
      maxAge: 0,
      httpOnly: true,
      signed: true,
    });
    res.status(200).send();
  }

  async function updateAccessToken(req: Request, res: Response) {
    jwt.verify(
      req.signedCookies["admin-refresh"],
      process.env.TOKEN_SECRET!,
      async (
        err: jwt.VerifyErrors | null,
        decoded: jwt.Jwt | JwtPayload | string | undefined
      ) => {
        if (err) {
          res.status(401).send();
        } else {
          const token = adminService.updateAccessToken(
            req.signedCookies["admin-refresh"]
          );

          if (token) {
            res.clearCookie("admin-access");
            res.cookie("admin-access", token, {
              maxAge: 1000 * 60 * 60 * 24,
              httpOnly: true,
              signed: true,
            });
            return res.status(205).send();
          } else {
            res.clearCookie("admin-access");
            res.clearCookie("admin-refresh");
            return res.status(401).send();
          }
        }
      }
    );
  }
};

const adminController = adminControllerFactory();

export default adminController;

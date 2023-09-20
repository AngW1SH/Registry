import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import adminService from "@/services/admin";

export const updateAccessToken = async (req: Request, res: Response) => {
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
};

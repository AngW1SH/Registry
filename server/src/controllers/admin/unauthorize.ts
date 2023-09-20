import { Request, Response } from "express";

export const unauthorize = async (req: Request, res: Response) => {
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
};

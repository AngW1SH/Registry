import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "@/../jwt";
import { prisma } from "@/../prisma-client";
import adminService from "@/services/admin";

export const createTokens = async (req: Request, res: Response) => {
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
};

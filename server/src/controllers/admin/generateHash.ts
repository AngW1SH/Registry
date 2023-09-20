import adminService from "@/services/admin";
import { Request, Response } from "express";

export const generateHash = (req: Request, res: Response) => {
  return adminService.hashPassword(req.params.word);
};

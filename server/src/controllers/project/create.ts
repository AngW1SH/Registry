import { Project } from "@/entities/project";
import projectService from "@/services/project";
import { Request, Response } from "express";

export const create = (req: Request, res: Response) => {
  const result = projectService.create(req.body.project);

  return result;
};

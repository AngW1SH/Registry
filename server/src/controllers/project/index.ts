import projectService from "@/services/project";
import { Request, Response } from "express";

const projectControllerFactory = () => {
  return Object.freeze({
    getActive,
    getNew,
  });

  async function getActive(req: Request, res: Response) {
    const projects = await projectService.getActive();

    res.status(200).json(projects);
  }

  async function getNew(req: Request, res: Response) {
    const projects = await projectService.getNew();

    res.status(200).json(projects);
  }
};

const projectController = projectControllerFactory();
export default projectController;

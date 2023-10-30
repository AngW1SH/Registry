import { getProjectFiltersFromDTO } from "@/entities/project";
import { BadRequestError } from "@/helpers/errors";
import projectService from "@/services/project";
import { Request, Response } from "express";

const projectControllerFactory = () => {
  return Object.freeze({
    getActive,
    getNew,
    findById,
    findMany,
  });

  async function getActive(req: Request, res: Response) {
    const tagIds = req.body ? (req.body.tagIds as string[]) : undefined;

    const projects = await projectService.getActive(tagIds);

    res.status(200).json(projects);
  }

  async function getNew(req: Request, res: Response) {
    const projects = await projectService.getNew();

    res.status(200).json(projects);
  }

  async function findById(req: Request, res: Response) {
    if (!req.body.id && !req.params.id)
      throw new BadRequestError("Missing project identifier");

    const result = await projectService.findById(
      +req.body.id || +req.params.id
    );

    res.status(200).json(result);
  }

  async function findMany(req: Request, res: Response) {
    const result = await projectService.findMany(
      getProjectFiltersFromDTO(req.body.filters)
    );

    res.status(200).json(result);
  }
};

const projectController = projectControllerFactory();
export default projectController;

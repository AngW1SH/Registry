import { getProjectFiltersFromDTO } from "@/entities/project";
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
    try {
      const tagIds = req.body ? (req.body.tagIds as string[]) : null;

      const projects = await projectService.getActive(tagIds);

      res.status(200).json(projects);
    } catch {
      res.sendStatus(500);
    }
  }

  async function getNew(req: Request, res: Response) {
    try {
      const projects = await projectService.getNew();

      res.status(200).json(projects);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async function findById(req: Request, res: Response) {
    try {
      if (!req.body.id && !req.params.id) return res.status(400).send();

      const result = await projectService.findById(
        +req.body.id || +req.params.id
      );

      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async function findMany(req: Request, res: Response) {
    try {
      const result = await projectService.findMany(
        getProjectFiltersFromDTO(req.body.filters)
      );

      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const projectController = projectControllerFactory();
export default projectController;

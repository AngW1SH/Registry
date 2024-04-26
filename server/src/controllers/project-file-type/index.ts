import projectFileTypeService from "@/services/project-file-type";
import { NextFunction, Request, Response } from "express";

const projectFileTypeControllerFactory = () => {
  return Object.freeze({
    findAll,
    findOne,
  });

  async function findAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).send(await projectFileTypeService.findAll());
    } catch (err) {
      next(err);
    }
  }

  async function findOne(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .send(await projectFileTypeService.findOne(+req.params.id));
    } catch (err) {
      next(err);
    }
  }
};

const projectFileTypeController = projectFileTypeControllerFactory();

export default projectFileTypeController;

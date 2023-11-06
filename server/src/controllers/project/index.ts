import { getProjectFiltersFromDTO } from "@/entities/project";
import { BadRequestError, UnauthorizedError } from "@/helpers/errors";
import projectService from "@/services/project";
import { NextFunction, Request, Response } from "express";

const projectControllerFactory = () => {
  return Object.freeze({
    getActive,
    getNew,
    findById,
    findMany,
    uploadResultFiles,
    deleteResultFile,
  });

  async function getActive(req: Request, res: Response, next: NextFunction) {
    try {
      const tagIds = req.body ? (req.body.tagIds as string[]) : undefined;

      const projects = await projectService.getActive(tagIds);

      res.status(200).json(projects);
    } catch (err) {
      next(err);
    }
  }

  async function getNew(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await projectService.getNew();

      res.status(200).json(projects);
    } catch (err) {
      next(err);
    }
  }

  async function findById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.id && !req.params.id)
        throw new BadRequestError("Missing project identifier");

      const result = await projectService.findById(
        +req.body.id || +req.params.id
      );

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async function findMany(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await projectService.findMany(
        getProjectFiltersFromDTO(req.body.filters)
      );

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async function deleteResultFile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in projectController.deleteResultFile"
        );

      if (!req.params.id)
        throw new BadRequestError("Missing required param: project id");
      if (!req.params.fileid)
        throw new BadRequestError("Missing required param: file id");

      const result = await projectService.deleteResultFile(
        +req.params.id,
        +req.params.fileid,
        req.user
      );

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  async function uploadResultFiles(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in projectController.uploadFileResults"
        );

      if (!req.body.project)
        throw new BadRequestError("Missing project identifier");
      if (!req.body.files) throw new BadRequestError("Missing files to upload");

      const result = projectService.uploadResultFiles(
        req.body.project,
        req.body.files,
        req.user
      );

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
};

const projectController = projectControllerFactory();
export default projectController;

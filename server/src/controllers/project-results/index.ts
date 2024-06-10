import { BadRequestError, UnauthorizedError } from "@/helpers/errors";
import projectResultsService from "@/services/project-results";
import { NextFunction, Request, Response } from "express";

const projectResultsControllerFactory = () => {
  return Object.freeze({
    uploadFile,
    deleteFile,
    changeFile,
  });

  async function deleteFile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in projectController.deleteResultFile"
        );

      if (!req.params.id)
        throw new BadRequestError("Missing required param: project id");
      if (!req.params.fileid)
        throw new BadRequestError("Missing required param: file id");

      const result = await projectResultsService.deleteFile(
        req.params.id,
        +req.params.fileid,
        req.user
      );

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  async function uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in projectController.uploadResulFiles"
        );

      if (!req.params.id)
        throw new BadRequestError("Missing project identifier");
      if (!req.files || Array.from(Object.keys(req.files)).length === 0)
        throw new BadRequestError("Missing files to upload");

      if (!req.body.category)
        throw new BadRequestError("Missing required body parameter: category");
      if (!req.body.team)
        throw new BadRequestError("Missing required body parameter: team");

      const result = await projectResultsService.uploadFile(
        req.params.id,
        req.body.team,
        Array.isArray(req.files.files) ? req.files.files[0] : req.files.files,
        req.body.category,
        req.user
      );

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  async function changeFile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in projectController.changeResultFile"
        );

      if (!req.params.id)
        throw new BadRequestError("Missing project identifier");
      if (!req.params.fileid)
        throw new BadRequestError("Missing file identifier");
      if (!req.files || Array.from(Object.keys(req.files)).length === 0)
        throw new BadRequestError("Missing files to upload");

      const result = await projectResultsService.changeFile(
        req.params.id,
        +req.params.fileid,
        Array.isArray(req.files.files) ? req.files.files[0] : req.files.files,
        req.user
      );

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
};

const projectResultsController = projectResultsControllerFactory();

export default projectResultsController;

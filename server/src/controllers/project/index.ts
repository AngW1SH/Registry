import { getProjectFiltersFromDTO } from "@/entities/project";
import { BadRequestError, UnauthorizedError } from "@/helpers/errors";
import projectService from "@/services/project";
import projectLinksService from "@/services/project-links";
import projectResultsService from "@/services/project-results";
import projectResultService from "@/services/project-results";
import { NextFunction, Request, Response } from "express";

const projectControllerFactory = () => {
  return Object.freeze({
    getActive,
    getNew,
    findById,
    findMany,
    uploadResultFiles,
    deleteResultFile,
    changeResultFile,
    addLink,
    deleteLink,
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
        getProjectFiltersFromDTO(req.body.filters),
        +req.body.page
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

      const result = await projectResultsService.deleteFile(
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
          "req.user not specified in projectController.uploadResulFiles"
        );

      if (!req.params.id)
        throw new BadRequestError("Missing project identifier");
      if (!req.files || Array.from(Object.keys(req.files)).length === 0)
        throw new BadRequestError("Missing files to upload");

      const result = await projectResultService.uploadFiles(
        +req.params.id,
        Array.isArray(req.files.files) ? req.files.files : [req.files.files],
        req.user
      );

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  async function changeResultFile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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

      const result = await projectResultService.changeFile(
        +req.params.id,
        +req.params.fileid,
        Array.isArray(req.files.files) ? req.files.files[0] : req.files.files,
        req.user
      );

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  async function addLink(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in projectController.addLink"
        );

      if (!req.params.id)
        throw new BadRequestError("Missing project identifier");
      if (!req.body.platform)
        throw new BadRequestError("Missing required parameter: platform");
      if (!req.body.link)
        throw new BadRequestError("Missing required parameter: link");

      const result = await projectLinksService.add(
        +req.params.id,
        req.body.platform,
        req.body.link,
        req.user
      );

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  async function deleteLink(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in projectController.addLink"
        );

      if (!req.params.id)
        throw new BadRequestError("Missing project identifier");
      if (!req.params.linkid)
        throw new BadRequestError("Missing required parameter: linkId");

      const result = await projectLinksService.deleteLink(
        +req.params.id,
        +req.params.linkid,
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

import { BadRequestError, UnauthorizedError } from "@/helpers/errors";
import projectLinksService from "@/services/project-links";
import { NextFunction, Request, Response } from "express";

const projectLinksControllerFactory = () => {
  return Object.freeze({
    addLink,
    deleteLink,
  });

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

const projectLinksController = projectLinksControllerFactory();

export default projectLinksController;

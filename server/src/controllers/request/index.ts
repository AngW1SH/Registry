import { BadRequestError, UnauthorizedError } from "@/helpers/errors";
import requestService from "@/services/request";
import { NextFunction, Request, Response } from "express";

const requestControllerFactory = () => {
  return Object.freeze({
    add,
    edit,
    getAvailable,
    deleteOne,
  });

  async function add(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.team)
        throw new BadRequestError("Missing required body parameter: team");
      if (!req.body.project)
        throw new BadRequestError("Missing required body parameter: project");
      if (!req.files || Array.from(Object.keys(req.files)).length === 0)
        throw new BadRequestError("Missing required body parameter: files");

      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in requestController.add"
        );

      const result = await requestService.add(
        req.body.team,
        req.body.project,
        req.user,
        Array.isArray(req.files.files) ? req.files.files : [req.files.files]
      );

      res.status(200).send();
    } catch (err) {
      next(err);
    }
  }

  async function edit(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method !== "PUT") throw new BadRequestError("Unsupported method");

      if (!req.body.hasOwnProperty("request"))
        throw new BadRequestError("Missing required body parameter: request");

      // May want to remove that bit later, but right now editing a request
      // essentially just means replacing files, so this is why now it's an error
      if (!req.files || Array.from(Object.keys(req.files)).length === 0)
        throw new BadRequestError("Missing required body parameter: files");

      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in requestController.edit"
        );

      const result = await requestService.edit(
        req.body.request,
        req.user,
        Array.isArray(req.files.files) ? req.files.files : [req.files.files]
      );

      res.status(200).send();
    } catch (err) {
      next(err);
    }
  }

  async function getAvailable(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method !== "GET") throw new BadRequestError("Unsupported method");

      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in requestController.getAvailable"
        );

      const result = await requestService.getAvailable(req.user);

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  async function deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method !== "DELETE")
        throw new BadRequestError("Unsupported method");

      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in requestController.getAvailable"
        );

      if (!req.params.id)
        throw new BadRequestError("Missing request identifier");

      const result = await requestService.deleteOne(+req.params.id, req.user);

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
};

const requestController = requestControllerFactory();

export default requestController;

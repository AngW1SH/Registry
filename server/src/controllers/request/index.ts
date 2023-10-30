import { BadRequestError, UnauthorizedError } from "@/helpers/errors";
import requestService from "@/services/request";
import { Request, Response } from "express";

const requestControllerFactory = () => {
  return Object.freeze({
    add,
  });

  async function add(req: Request, res: Response) {
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
  }
};

const requestController = requestControllerFactory();

export default requestController;

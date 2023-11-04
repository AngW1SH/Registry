import { BadRequestError, UnauthorizedError } from "@/helpers/errors";
import memberService from "@/services/member";
import { NextFunction, Request, Response } from "express";

const memberControllerFactory = () => {
  return {
    edit,
  };

  async function edit(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in memberController.edit"
        );

      if (req.method != "PUT")
        throw new BadRequestError("Unsupported method: " + req.method);

      if (!req.body.member)
        throw new BadRequestError("Missing required body parameter: member");

      const result = await memberService.edit(req.body.member, req.user);

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
};

const memberController = memberControllerFactory();

export default memberController;

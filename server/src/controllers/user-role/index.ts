import { BadRequestError } from "@/helpers/errors";
import userRoleService from "@/services/user-role";
import { NextFunction, Request, Response } from "express";

const userRoleControllerFactory = () => {
  return Object.freeze({
    findInFilters,
  });

  async function findInFilters(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (req.method !== "POST" && req.method !== "GET")
        throw new BadRequestError("Unsupported method");

      const result = await userRoleService.findInFilters(
        req.body.query || req.params.query
      );

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
};

const userRoleController = userRoleControllerFactory();

export default userRoleController;

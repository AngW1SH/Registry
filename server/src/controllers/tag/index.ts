import { BadRequestError } from "@/helpers/errors";
import tagService from "@/services/tag";
import { NextFunction, Request, Response } from "express";

const tagControllerFactory = () => {
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

      const result = await tagService.findInFilters(
        req.body.query || req.params.query
      );

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
};

const tagController = tagControllerFactory();

export default tagController;

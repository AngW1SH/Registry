import { NextFunction, Request, Response } from "express";
import BaseError from "./BaseError";

const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    console.error(err.name);
    console.error(err.stack);
  } else {
    console.error(err);
  }

  next(err);
};

export default errorLogger;

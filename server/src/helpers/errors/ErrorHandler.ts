import { NextFunction, Request, Response } from "express";
import BaseError from "./BaseError";
import { ServerError, UnauthorizedError } from ".";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send(err.message);
  }

  // Most likely sent by passport.js
  if (err.message == "Unauthorized") {
    const unauthorizedError = new UnauthorizedError("");
    return res
      .status(unauthorizedError.statusCode)
      .send(unauthorizedError.message);
  }

  const serverError = new ServerError("");

  res.status(serverError.statusCode).send({ message: serverError.message });
};

export default errorHandler;

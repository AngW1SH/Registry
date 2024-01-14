import BaseError from "./BaseError";
import { HTTPStatusCodes } from "./statusCodes";

class BadRequestError extends BaseError {
  constructor(
    name: string,
    statusCode = HTTPStatusCodes.BAD_REQUEST,
    description = "The server cannot or will not process the request due to an apparent client error",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

export default BadRequestError;

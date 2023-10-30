import BaseError from "./BaseError";
import { HTTPStatusCodes } from "./statusCodes";

class NotFoundError extends BaseError {
  constructor(
    name: string,
    statusCode = HTTPStatusCodes.NOT_FOUND,
    description = "The requested resource could not be found",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

export default NotFoundError;

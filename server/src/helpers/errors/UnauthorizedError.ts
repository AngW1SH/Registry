import BaseError from "./BaseError";
import { HTTPStatusCodes } from "./statusCodes";

class UnauthorizedError extends BaseError {
  constructor(
    name: string,
    statusCode = HTTPStatusCodes.UNAUTHORIZED,
    description = "Unauthorized",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

export default UnauthorizedError;

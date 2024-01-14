import BaseError from "./BaseError";
import { HTTPStatusCodes } from "./statusCodes";

class ServerError extends BaseError {
  constructor(
    name: string,
    statusCode = HTTPStatusCodes.INTERNAL_SERVER,
    description = "Internal Server Error",
    isOperational = false
  ) {
    super(name, statusCode, isOperational, description);
  }
}

export default ServerError;

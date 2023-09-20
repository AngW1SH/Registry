import { unauthorize } from "./unauthorize";
import { updateAccessToken } from "./updateAccessToken";
import { generateHash } from "./generateHash";
import { createTokens } from "./createTokens";

const adminController = Object.freeze({
  unauthorize,
  updateAccessToken,
  generateHash,
  createTokens,
});

export default adminController;

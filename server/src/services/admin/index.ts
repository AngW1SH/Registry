import { updateAccessToken } from "./updateAccessToken";
import { hashPassword } from "./hashPassword";
import { createTokens } from "./createTokens";

const adminService = Object.freeze({
  updateAccessToken,
  hashPassword,
  createTokens,
});

export default adminService;

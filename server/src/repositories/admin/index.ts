import { findByToken } from "./findByToken";
import { hashPassword } from "./hashPassword";
import { updateToken } from "./updateToken";

const adminRepository = Object.freeze({
  findByToken,
  hashPassword,
  updateToken,
});

export default adminRepository;

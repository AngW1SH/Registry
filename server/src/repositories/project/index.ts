import { add } from "./add";
import { findById } from "./findById";

const projectRepository = Object.freeze({
  add,
  findById,
});

export default projectRepository;

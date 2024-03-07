import { PlatformName } from "@/entities/Platform/types";
import { ResourceConfig } from "../types";
import { githubConfig } from "./github";

export const configs: { [key in PlatformName]: ResourceConfig } = {
  GitHub: githubConfig,
};

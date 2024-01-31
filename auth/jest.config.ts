import type { Config } from "@jest/types";
import dotenv from "dotenv";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

dotenv.config({
  path: ".env",
});
export default config;

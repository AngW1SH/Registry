import type { IPlatform } from "./types";
import { platformSlice } from "./model/platformSlice";
import { fetchAllPlatforms } from "./model/platformSlice";

export type { IPlatform };
export { platformSlice, fetchAllPlatforms };

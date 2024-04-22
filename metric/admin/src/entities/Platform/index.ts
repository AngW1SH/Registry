import type { IPlatform } from "./types";
import { platformSlice } from "./model/platformSlice";
import { fetchAllPlatforms } from "./model/platformSlice";
import { selectPlatformById } from "./model/selectById";
import PlatformIcon from "./ui/PlatformIcon";

export type { IPlatform };
export { platformSlice, fetchAllPlatforms, selectPlatformById, PlatformIcon };

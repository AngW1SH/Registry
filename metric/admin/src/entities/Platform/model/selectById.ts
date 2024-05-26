import { PlatformState } from "./platformSlice";

export const selectPlatformByName = (
  state: PlatformState,
  platformName: string
) => state.platforms.find((platform) => platform.name === platformName);

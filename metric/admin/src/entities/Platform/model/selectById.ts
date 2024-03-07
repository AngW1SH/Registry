import { PlatformState } from "./platformSlice";

export const selectPlatformById = (state: PlatformState, platformId: string) =>
  state.platforms.find((platform) => platform.id === platformId);

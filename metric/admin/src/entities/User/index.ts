import type { IUser } from "./types";
import { userSlice, fetchUserThunk } from "./model/userSlice";
import { useForceUser } from "./hooks/useForceUser";

export type { IUser };
export { userSlice, fetchUserThunk, useForceUser };

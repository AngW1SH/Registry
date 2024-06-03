import { useAppSelector } from "@/app/store";
import { shallowEqual } from "react-redux";

export const useSelectedUsers = (resourceId: string) => {
  const users =
    useAppSelector(
      (state) =>
        state.resource.resources.find((r) => r.id == resourceId)?.users,
      shallowEqual
    ) || {};

  return Object.keys(users).filter((key) => users[key]);
};

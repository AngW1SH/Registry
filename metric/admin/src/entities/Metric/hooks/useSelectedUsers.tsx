import { useAppSelector } from "@/app/store";

export const useSelectedUsers = (resourceId: string) => {
  const users =
    useAppSelector(
      (state) => state.resource.resources.find((r) => r.id == resourceId)?.users
    ) || {};

  return Object.keys(users).filter((key) => users[key]);
};

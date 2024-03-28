import { useAppSelector } from "@/app/store";

export const useSelectedUsers = () => {
  const users = useAppSelector((state) => state.metric.users);

  return Object.keys(users).filter((key) => users[key]);
};

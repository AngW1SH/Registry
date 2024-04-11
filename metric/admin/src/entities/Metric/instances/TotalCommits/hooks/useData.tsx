import { useAppDispatch } from "@/app/store";
import { useEffect } from "react";
import { useSelectedUsers } from "@/entities/Metric/hooks/useSelectedUsers";
import { resourceSlice } from "@/entities/Resource";
import { Commits } from "../../Commits/types";

export const useData = (
  data: Commits,
  calendar: { start: Date | null; end: Date | null },
  resourceId: string
) => {
  const successData = data.filter((item) => !item.error && item.data);

  const dispatch = useAppDispatch();
  const users = useSelectedUsers(resourceId);

  useEffect(() => {
    const users = new Set<string>();
    successData.forEach((item) => {
      if (!users.has(item.data.author.login)) users.add(item.data.author.login);
    });

    Array.from(users).forEach((item) => {
      dispatch(resourceSlice.actions.addUser({ username: item, resourceId }));
    });
  }, []);

  return successData
    .filter((item) => {
      if (
        calendar.start &&
        new Date(item.data.commit.author.date) < calendar.start
      )
        return false;
      if (calendar.end && new Date(item.data.commit.author.date) > calendar.end)
        return false;

      return true;
    })
    .filter((item) => {
      return !users.length || users.includes(item.data.author.login);
    });
};

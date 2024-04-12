import { useAppDispatch } from "@/app/store";
import { useEffect } from "react";
import { useSelectedUsers } from "@/entities/Metric/hooks/useSelectedUsers";
import { resourceSlice } from "@/entities/Resource";
import { Commits } from "../../Commits/types";

export const useData = (
  data: Commits,
  calendar: { start: string | null; end: string | null },
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

  const startDate = calendar.start ? new Date(calendar.start) : null;
  const endDate = calendar.end ? new Date(calendar.end) : null;

  return successData
    .filter((item) => {
      if (startDate && new Date(item.data.commit.author.date) < startDate)
        return false;
      if (endDate && new Date(item.data.commit.author.date) > endDate)
        return false;

      return true;
    })
    .filter((item) => {
      return !users.length || users.includes(item.data.author.login);
    });
};

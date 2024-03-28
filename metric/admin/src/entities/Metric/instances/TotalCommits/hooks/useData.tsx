import { IGenericSnapshotList } from "@/entities/Metric/types";
import { TotalCommitsSchema } from "../types/validate";
import { useAppDispatch } from "@/app/store";
import { useEffect } from "react";
import { useSelectedUsers } from "@/entities/Metric/hooks/useSelectedUsers";
import { resourceSlice } from "@/entities/Resource";

export const useData = (
  data: IGenericSnapshotList,
  calendar: { start: Date | null; end: Date | null },
  resourceId: string
) => {
  const successData = data.filter((item) => !item.error);

  const dispatch = useAppDispatch();
  const users = useSelectedUsers(resourceId);

  const parseResult = TotalCommitsSchema.safeParse(successData);
  if (!parseResult.success) return [];

  useEffect(() => {
    parseResult.data.forEach((item) => {
      item.data.forEach((user) => {
        dispatch(
          resourceSlice.actions.addUser({ resourceId, username: user.name })
        );
      });
    });
  }, []);

  return parseResult.data
    .filter((item) => {
      if (calendar.start && item.timestamp < calendar.start) return false;
      if (calendar.end && item.timestamp > calendar.end) return false;

      return true;
    })
    .map((item) => {
      return {
        ...item,
        data: item.data.filter((user) => users.includes(user.name)),
      };
    });
};

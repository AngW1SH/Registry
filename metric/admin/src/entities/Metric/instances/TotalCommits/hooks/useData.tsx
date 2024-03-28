import { IGenericSnapshotList } from "@/entities/Metric/types";
import { TotalCommitsSchema } from "../types/validate";
import { useAppDispatch } from "@/app/store";
import { metricSlice } from "@/entities/Metric";
import { useEffect } from "react";
import { useSelectedUsers } from "@/entities/Metric/hooks/useSelectedUsers";

export const useData = (
  data: IGenericSnapshotList,
  calendar: { start: Date | null; end: Date | null }
) => {
  const successData = data.filter((item) => !item.error);

  const dispatch = useAppDispatch();
  const users = useSelectedUsers();

  const parseResult = TotalCommitsSchema.safeParse(successData);
  if (!parseResult.success) return [];

  useEffect(() => {
    parseResult.data.forEach((item) => {
      item.data.forEach((user) => {
        dispatch(metricSlice.actions.addUser(user.name));
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

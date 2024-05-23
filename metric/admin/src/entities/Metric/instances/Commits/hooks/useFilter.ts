import { useSelectedUsers } from "@/entities/Metric";
import { Commits } from "../types";
import { useAppSelector } from "@/app/store";

export const useFilter = (data: Commits, resourceId: string) => {
  const successData = data.filter((item) => !item.error && item.data);

  const calendar = useAppSelector((state) => state.metric.calendar);
  const users = useSelectedUsers(resourceId);

  const startDate = calendar.start ? new Date(calendar.start) : null;
  const endDate = calendar.end ? new Date(calendar.end) : null;

  return successData
    .filter((item) => {
      if (
        startDate &&
        new Date(item.data.commit.author?.date || "") < startDate
      )
        return false;
      if (endDate && new Date(item.data.commit.author?.date || "") > endDate)
        return false;

      return true;
    })
    .filter((item) => {
      return (
        !users.length ||
        (item.data.author?.login && users.includes(item.data.author.login))
      );
    });
};

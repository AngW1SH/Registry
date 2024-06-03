import { useSelectedUsers } from "@/entities/Metric";
import { PullRequests } from "../types";
import { useAppSelector } from "@/app/store";
import { shallowEqual } from "react-redux";

export const useFilter = (data: PullRequests, resourceId: string) => {
  const calendar = useAppSelector(
    (state) => state.metric.calendar,
    shallowEqual
  );

  const successData = data.filter((item) => !item.error && item.data);

  const users = useSelectedUsers(resourceId);

  const startDate = calendar.start ? new Date(calendar.start) : null;
  const endDate = calendar.end ? new Date(calendar.end) : null;

  return successData
    .filter((item) => {
      if (
        startDate &&
        item.data.closed_at &&
        new Date(item.data.closed_at) < startDate
      )
        return false;
      if (endDate && new Date(item.data.created_at) > endDate) return false;

      return true;
    })
    .filter((item) => {
      return (
        !users.length ||
        (item.data.user && users.includes(item.data.user.login))
      );
    });
};

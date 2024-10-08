import { Duration } from "@/entities/Metric/types/params";
import { PullRequests } from "../../PullRequests";
import { RapidPullRequestItem } from "../types";
import { durationToMilliseconds } from "@/entities/Metric/utils/durationToMilliseconds";

export function msToTime(duration: number) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  const formatHours = hours < 10 ? "0" + hours : hours;
  const formatMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formatSeconds = seconds < 10 ? "0" + seconds : seconds;

  return days + "d " + formatHours + ":" + formatMinutes + ":" + formatSeconds;
}

export const calculate = (
  data: PullRequests,
  threshold: Duration,
  daysInGroup: number,
  firstDayProp?: Date
): RapidPullRequestItem[] => {
  const groupedData: { [key: string]: number } = {};

  let firstDay = firstDayProp ? firstDayProp : new Date();

  if (!firstDayProp)
    data.forEach((item) => {
      const date = new Date(item.data.created_at);

      if (date < firstDay) {
        firstDay = date;
      }
    });

  data.forEach((item) => {
    const date = new Date(item.data.created_at);

    const weekNumber = getWeekNumber(date, firstDay, daysInGroup);
    if (!groupedData[weekNumber]) {
      groupedData[weekNumber] = 0;
    }

    if (!item.data.closed_at) return;

    if (
      +new Date(item.data.closed_at) - +new Date(item.data.created_at) <
      durationToMilliseconds(threshold)
    ) {
      groupedData[weekNumber] += 1;
    }
  });

  const groupedDataArray = Object.keys(groupedData).map((key) => {
    return {
      weekNum: key,
      data: groupedData[key],
    };
  });

  groupedDataArray.sort((a, b) => {
    return +a.weekNum - +b.weekNum;
  });

  return groupedDataArray.map((item) => ({
    ...item,
    label: getLabel(firstDay, +item.weekNum, daysInGroup),
    data: item.data,
  }));
};

const getWeekNumber = (date: Date, firstDay: Date, daysInGroup: number) => {
  const weekNum = Math.ceil(
    ((+date - +firstDay) / 86400000 + firstDay.getDay() + 1) / daysInGroup
  );
  return weekNum;
};

const getLabel = (firstDay: Date, weekNum: number, daysInGroup: number) => {
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() + (weekNum - 1) * daysInGroup);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + daysInGroup - 1);

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

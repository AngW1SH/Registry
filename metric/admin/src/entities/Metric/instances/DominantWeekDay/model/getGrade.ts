import { DominantWeekDayValue } from "../types";

const supportedOptions = [
  "Not Specified",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const getGrade = (
  data: DominantWeekDayValue[],
  unwantedDay: string
): number | null => {
  // We only grade whether there's higher activity on the unwanted day
  if (unwantedDay === "Not Specified") return null;

  if (
    !supportedOptions.includes(unwantedDay) ||
    !data.find((item) => item.label === unwantedDay)
  )
    return null;

  // Find out the average number of actions on all the other week days
  const averageActions =
    data.reduce((acc, cur) => {
      if (cur.label === unwantedDay) {
        return acc;
      }
      return acc + cur.data;
    }, 0) /
    (data.length - 1);

  const ratio =
    (data.find((item) => item.label === unwantedDay)?.data || 0) /
    averageActions;

  // If there are less than average actions, we don't really have a problem with that
  if (ratio < 1) return 5;

  // 3 times the normal amount gets a "2"
  // the normal amount gets a "5"
  return +Math.max(0, (-3 / 2) * ratio + 13 / 2).toFixed(2);
};

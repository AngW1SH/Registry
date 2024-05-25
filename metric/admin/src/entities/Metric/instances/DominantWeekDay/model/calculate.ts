import { DominantWeekDayData, DominantWeekDayValue } from "../types";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const calculate = (
  data: DominantWeekDayData
): DominantWeekDayValue[] => {
  const result = weekDays.map((day) => ({
    label: day,
    data: 0,
  }));

  data.commits.forEach((commit) => {
    if (!commit.data.commit.author?.date) return;

    const day = new Date(commit.data.commit.author.date).getDay();
    result[day].data += 1;
  });

  data.issues.forEach((iss) => {
    const day = new Date(iss.data.created_at).getDay();
    result[day].data += 1;

    if (iss.data.closed_at) {
      const day = new Date(iss.data.closed_at).getDay();
      result[day].data -= 1;
    }
  });

  data.pullRequests.forEach((pr) => {
    const day = new Date(pr.data.created_at).getDay();
    result[day].data += 1;

    if (pr.data.closed_at) {
      const day = new Date(pr.data.closed_at).getDay();
      result[day].data -= 1;
    }
  });

  return result;
};

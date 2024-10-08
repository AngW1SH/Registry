import { Commits } from "../../Commits";

export const groupData = (
  data: Commits,
  daysInGroup: number,
  firstDayProp?: Date
) => {
  const groupedData: { [key: string]: number } = {};

  let firstDay = firstDayProp ? firstDayProp : new Date();

  if (!firstDayProp)
    data.forEach((item) => {
      const date = new Date(item.data.commit.author?.date || "");

      if (date < firstDay) {
        firstDay = date;
      }
    });

  data.forEach((item) => {
    const date = new Date(item.data.commit.author?.date || "");

    const weekNumber = getWeekNumber(date, firstDay, daysInGroup);
    if (!groupedData[weekNumber]) {
      groupedData[weekNumber] = 1;
    }
    groupedData[weekNumber]++;
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

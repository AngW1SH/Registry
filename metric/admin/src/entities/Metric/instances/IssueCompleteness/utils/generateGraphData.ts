import { Issues } from "../../Issues";

export const groupData = (
  data: Issues,
  daysInGroup: number,
  firstDayProp?: Date
) => {
  const groupedData: { [key: string]: { opened: number; closed: number } } = {};

  let firstDay = firstDayProp ? firstDayProp : new Date();

  if (!firstDayProp)
    data.forEach((item) => {
      const date = new Date(item.data.created_at);

      if (date < firstDay) {
        firstDay = date;
      }
    });

  data.forEach((item) => {
    const openDate = new Date(item.data.created_at);

    const closeDate = item.data.closed_at
      ? new Date(item.data.closed_at)
      : null;

    const openWeekNumber = getWeekNumber(openDate, firstDay, daysInGroup);
    const closeWeekNumber = closeDate
      ? getWeekNumber(closeDate, firstDay, daysInGroup)
      : null;

    if (!groupedData[openWeekNumber]) {
      groupedData[openWeekNumber] = {
        opened: 1,
        closed: 0,
      };
    } else {
      groupedData[openWeekNumber].opened++;
    }

    if (closeWeekNumber) {
      if (!groupedData[closeWeekNumber]) {
        groupedData[closeWeekNumber] = {
          opened: 0,
          closed: 1,
        };
      } else {
        groupedData[closeWeekNumber].closed++;
      }
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

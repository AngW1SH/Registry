import { TotalCommits } from "../types/validate";

export const calculate = (data: TotalCommits) => {
  let result = 0;

  const latestTimestamp = data.reduce(
    (a, b) => {
      return a.timestamp > b.timestamp ? a : b;
    },
    { timestamp: new Date("01.01.1970") }
  ).timestamp;

  data.forEach((x) => {
    if (x.timestamp == latestTimestamp) {
      x.data.forEach((user) => {
        result += user.value;
      });
    }
  });

  return result;
};

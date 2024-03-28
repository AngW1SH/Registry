import { TotalCommits } from "../types/validate";

export const calculate = (data: TotalCommits) => {
  let maxDate = new Date("01.01.1970");
  let result = -1;

  data.forEach((x) => {
    if (x.timestamp > maxDate) {
      maxDate = x.timestamp;
      result = x.data.value;
    }
  });

  return result === -1 ? 0 : result;
};

import { PullRequests } from "../../PullRequests";

export const getGrade = (data: PullRequests) => {
  if (data.length === 0) return null;

  let sum = 0;
  let count = 0;

  data.forEach((item) => {
    if (item.data.closed_at) {
      sum += +new Date(item.data.closed_at) - +new Date(item.data.created_at);

      count += 1;
    }
  });

  const result = sum / count;

  if (result < 1000 * 60 * 5) {
    return +(result / (1000 * 60)).toFixed(2);
  }

  const resultFinal = +(
    (1 - result / (1000 * 60 * 60 * 24 * 7)) * 3 +
    2
  ).toFixed(2);

  if (resultFinal > 0) return resultFinal;

  return 0;
};

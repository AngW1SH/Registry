import { PullRequests } from "../../PullRequests";

export const getGrade = (data: PullRequests) => {
  let sum = 0;
  let count = 0;

  data.forEach((item) => {
    if (item.data.closed_at) {
      sum += +new Date(item.data.closed_at) - +new Date(item.data.created_at);
    } else {
      sum += +new Date() - +new Date(item.data.created_at);
    }

    count += 1;
  });

  const result = sum / count;

  console.log(result / (1000 * 60 * 60 * 24 * 7));

  if (result < 1000 * 60 * 5) {
    return result / (1000 * 60);
  }

  return (1 - result / (1000 * 60 * 60 * 24 * 7)) * 5;
};

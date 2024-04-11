import { Issues } from "../../Issues";

export const calculate = (data: Issues) => {
  let completed = 0;
  let total = data.length;

  data.forEach((item) => {
    if (item.data.closed_at) completed++;
  });

  return { completed, total };
};

import { Issues } from "../../Issues";

export const getGrade = (data: Issues): number | null => {
  if (data.length === 0) return null;

  const result = {
    total: data.length,
    closed: 0,
  };

  data.forEach((item) => {
    if (item.data.closed_at) {
      result.closed += 1;
    }
  });

  return +((result.closed / result.total) * 5).toFixed(2);
};

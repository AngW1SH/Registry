export const formatDate = (start: Date | null, end: Date | null) => {
  let result = "";

  if (start)
    result +=
      "с " +
      start.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
  if (end)
    result +=
      " по " +
      end.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

  return result.trim();
};

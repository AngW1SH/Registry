export const formatNameShort = (name: string) => {
  if (!name) return name;

  const parts = name
    .trim()
    .split(" ")
    .filter((part) => part.length);

  if (parts.length == 0) return name;

  if (parts.length == 1) return parts[0];

  if (parts.length == 2) return parts[0] + " " + parts[1][0].toUpperCase();

  return (
    parts[0] +
    " " +
    parts[1][0].toUpperCase() +
    ". " +
    parts[2][0].toUpperCase() +
    "."
  );
};

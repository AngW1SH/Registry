export const formatNameShort = (name: string) => {
  const parts = name.split(" ");

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

export const formatNameShort = (name: string) => {
  const parts = name.split(" ");

  return (
    parts[0] +
    " " +
    parts[1][0].toUpperCase() +
    ". " +
    parts[2][0].toUpperCase() +
    "."
  );
};

export const getFullName = (stringName: string) => {
  const [surname, name, patronymic] = stringName.split(" ");

  return {
    surname: surname || "",
    name: name || "",
    patronymic: patronymic || "",
  };
};

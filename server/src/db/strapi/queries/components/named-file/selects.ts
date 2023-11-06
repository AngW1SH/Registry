export const selectNamedFile = () => {
  return {
    fields: ["name", "date"],
    populate: {
      file: {
        fields: ["name", "url", "mime", "size"],
      },
    },
  };
};

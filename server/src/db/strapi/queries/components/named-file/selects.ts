export const selectNamedFile = () => {
  return {
    fields: ["name"],
    populate: {
      file: {
        fields: ["name", "url", "mime", "size"],
      },
    },
  };
};

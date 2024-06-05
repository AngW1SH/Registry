export const selectProjectDocument = () => {
  return {
    fields: ["name", "date", "type", "isPublic"],
    populate: {
      file: {
        fields: ["name", "url", "mime", "size"],
      },
      type: {
        fields: ["name"],
      },
    },
  };
};

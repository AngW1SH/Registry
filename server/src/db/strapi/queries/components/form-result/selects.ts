export const selectFormResult = () => {
  return {
    populate: {
      file: {
        fields: ["id"],
      },
      form: {
        fields: ["id"],
      },
    },
  };
};

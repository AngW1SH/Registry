export const selectForm = () => ({
  fields: ["id", "name", "link", "type"],
  populate: {
    identifiers: {
      provider: true,
      question: true,
    },
  },
});

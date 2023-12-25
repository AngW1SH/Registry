export const selectProjectLink = () => {
  return {
    fields: ["link"],
    populate: {
      platform: {
        fields: ["name"],
      },
    },
  };
};

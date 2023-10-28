import { SelectPopulate } from "@/db/types/types";

type PopulateOptions = "members" | "administrators" | "requests";

export const selectTeam = (populate: SelectPopulate<PopulateOptions> = {}) => {
  return {
    fields: ["name"],
    populate: {
      project: {
        fields: ["id"],
      },
      ...populate,
    },
  };
};

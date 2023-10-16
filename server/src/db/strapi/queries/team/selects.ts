import { SelectPopulate } from "@/db/types/types";

type PopulateOptions = "members" | "administrators";

export const selectTeam = (populate: SelectPopulate<PopulateOptions> = {}) => {
  return {
    fields: ["name"],
    populate,
  };
};

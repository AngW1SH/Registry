import { SelectPopulate } from "@/db/types/types";

export const selectDeveloperRequirements = () => {
  return {
    populate: {
      fields: ["name"],
    },
  };
};

type PopulateOptions = "tags" | "team";

export const selectProjectInList = (
  populate: SelectPopulate<PopulateOptions> = {}
) => {
  return {
    fields: [
      "name",
      "description",
      "dateStart",
      "dateEnd",
      "enrollmentStart",
      "enrollmentEnd",
      "supervisor",
      "curator",
      "client",
    ],
    populate,
  };
};

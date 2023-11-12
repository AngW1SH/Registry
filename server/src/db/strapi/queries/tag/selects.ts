import { SelectPopulate } from "@/db/types/types";

type PopulateOptions = "projectsCount";

export const selectTag = (populate: SelectPopulate<PopulateOptions> = {}) => {
  return {
    fields: ["id", "name"],
    populate: {
      ...(populate &&
        populate.projectsCount && {
          projects: {
            count: true,
          },
        }),
    },
  };
};

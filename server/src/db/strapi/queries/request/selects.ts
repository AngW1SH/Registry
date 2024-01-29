import { SelectPopulate } from "@/db/types/types";

type PopulateOptions = "team";

export const selectRequest = (populate?: SelectPopulate<PopulateOptions>) => {
  return {
    fields: ["id", "name"],
    populate: {
      team: {
        id: true,
      },
      project: {
        fields: ["id", "slug"],
      },
      files: true,
      ...populate,
    },
  };
};

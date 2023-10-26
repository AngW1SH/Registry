import { SelectPopulate } from "@/db/types/types";

type PopulateOptions = "team";

export const selectRequest = (populate?: SelectPopulate<PopulateOptions>) => {
  return {
    populate: {
      team: {
        id: true,
      },
      project: {
        id: true,
      },
      ...populate,
    },
  };
};

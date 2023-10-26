import { SelectPopulate } from "@/db/types/types";

type PopulateOptions = "user";

export const selectMember = (
  populate: SelectPopulate<PopulateOptions> = {}
) => {
  return {
    fields: ["id", "name", "role"],
    populate: {
      team: {
        id: true,
      },
      ...populate,
    },
  };
};

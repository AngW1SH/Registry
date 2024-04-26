import { SelectPopulate } from "@/db/types/types";

type PopulateOptions = "user";

export const selectMember = (
  populate: SelectPopulate<PopulateOptions> = {}
) => {
  return {
    fields: ["id", "name"],
    populate: {
      team: {
        id: true,
      },
      role: {
        fields: ["id", "name"],
      },
      ...populate,
    },
  };
};

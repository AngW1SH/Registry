import { selectUser } from "@/db/queries/user";
import { SelectPopulate } from "@/db/types/types";

type PopulateOptions = "user";

export const selectMember = (
  populate: SelectPopulate<PopulateOptions> = {}
) => {
  return {
    populate,
  };
};

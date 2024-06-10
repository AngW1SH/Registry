import { SelectPopulate } from "@/db/types/types";
import { selectProjectDocument } from "../components/project-document";

type PopulateOptions = "members" | "administrators" | "requests";

export const selectTeam = (populate: SelectPopulate<PopulateOptions> = {}) => {
  return {
    fields: ["name"],
    populate: {
      project: {
        fields: ["id", "slug"],
      },
      documents: selectProjectDocument(),
      ...populate,
    },
  };
};

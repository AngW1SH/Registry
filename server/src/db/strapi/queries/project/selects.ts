import { SelectPopulate } from "@/db/types/types";
import { selectNamedFile } from "../components/named-file";

export const selectDeveloperRequirements = () => {
  return {
    populate: {
      fields: ["name"],
    },
  };
};

export const selectDescriptionFiles = () => {
  return selectNamedFile();
};

export const selectResultFiles = () => {
  return selectNamedFile();
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
      "teamLimit",
    ],
    populate: {
      ...populate,
      teams: {
        fields: ["id"],
      },
    },
  };
};

export const selectProjectReference = () => {
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
      "teamLimit",
    ],
  };
};

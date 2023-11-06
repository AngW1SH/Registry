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
      teams: {
        fields: ["id"],
      },
      ...populate,
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

export const selectUserProject = (
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
      teams: {
        fields: ["id"],
      },
      resultFiles: true,
      ...populate,
    },
  };
};

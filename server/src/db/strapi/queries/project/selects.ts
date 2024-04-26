import { SelectPopulate } from "@/db/types/types";
import { selectNamedFile } from "../components/named-file";
import { selectProjectLink } from "../components/project-link";
import { selectProjectDocument } from "../components/project-document";

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

export const selectProjectLinks = () => {
  return selectProjectLink();
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
      "slug",
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
      "slug",
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
      "slug",
    ],
    populate: {
      teams: {
        fields: ["id"],
      },
      resultFiles: selectNamedFile(),
      projectLink: selectProjectLinks(),
      documents: selectProjectDocument(),
      ...populate,
    },
  };
};

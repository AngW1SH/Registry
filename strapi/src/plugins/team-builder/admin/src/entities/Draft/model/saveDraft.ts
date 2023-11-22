import { getFetchClient } from "@strapi/helper-plugin";
import { IDraft } from "..";
import { IDraftDTO } from "../types";

export const saveDraft = async (draft: IDraftDTO) => {
  const { put } = getFetchClient();

  const response = await put("/team-builder/draft/" + draft.id, {
    draft,
  });
};

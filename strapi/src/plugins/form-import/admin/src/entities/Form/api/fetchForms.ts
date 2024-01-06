import { getFetchClient } from "@strapi/helper-plugin";
import { IForm } from "..";
import { IFormTemplate } from "../types";

export const fetchForms = async (): Promise<IFormTemplate[]> => {
  const { get } = getFetchClient();

  const response = await get("/team-builder/form");

  if (response.status != 200) return [];

  return response.data;
};

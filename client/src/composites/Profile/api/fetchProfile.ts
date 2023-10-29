import { authorizedFetch } from "@/shared/utils";
import { ProfileDTO } from "../types/types";
import { getProjectFromDTO } from "@/entities/Project";
import { getFormFromDTO } from "@/entities/Form";

export const fetchProfile = async () => {
  const result: ProfileDTO | null = await authorizedFetch(
    process.env.NEXT_PUBLIC_WEBSITE_URL + "/api/user/profile",
  ).then((result) => (result.ok ? result.json() : null));

  return result
    ? {
        ...result,
        projects: result.projects.map((project) => getProjectFromDTO(project)),
        forms: result.forms.map((form) => getFormFromDTO(form)),
      }
    : null;
};
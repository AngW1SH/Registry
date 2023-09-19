import { staticProjects } from "@/entities/Project";
import { staticTags } from "@/entities/Tag";

export const fetchNewProjects = async () => {
  return {
    projects: staticProjects,
    tags: staticTags,
  };
};

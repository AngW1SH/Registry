import { staticProjects } from "@/entities/Project";

export const fetchActiveProjects = async () => {
  return staticProjects;
};

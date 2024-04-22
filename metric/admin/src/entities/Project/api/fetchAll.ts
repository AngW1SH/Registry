import { IProject } from "..";

export const fetchAll = async (): Promise<IProject[]> => {
  const response = await fetch(import.meta.env.VITE_SERVER_URL + "project");

  if (!response.ok) throw new Error("Failed to fetch projects");

  return response.json();
};

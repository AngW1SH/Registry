import { IProject } from "..";

export const fetchAll = async (): Promise<IProject[]> => {
  const response = await fetch("http://localhost:5173/api/project");

  if (!response.ok) throw new Error("Failed to fetch projects");

  return response.json();
};

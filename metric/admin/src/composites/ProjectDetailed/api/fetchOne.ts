import { IProjectDetailed } from "..";

export const fetchOne = async (
  id: string
): Promise<IProjectDetailed | null> => {
  const response = await fetch(`http://localhost:5173/api/project/${id}`);

  if (!response.ok) throw new Error("Failed to fetch project data");

  try {
    return response.json();
  } catch {
    return null;
  }
};

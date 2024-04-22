import { IProjectDetailed } from "@/composites/ProjectDetailed";

export const fetchAddProject = async (
  name: string
): Promise<IProjectDetailed | null> => {
  const result = await fetch(import.meta.env.VITE_SERVER_URL + "project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      project: {
        name: name,
      },
    }),
  });

  if (!result.ok) throw new Error("Failed to create a project");

  try {
    return result.json();
  } catch {
    return null;
  }
};

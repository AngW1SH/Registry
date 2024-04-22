import { IResource } from "@/entities/Resource";

export const fetchAddResource = async (
  name: string,
  platform: string,
  project: string
): Promise<IResource | null> => {
  const result = await fetch(import.meta.env.VITE_SERVER_URL + "resource", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resource: {
        name: name,
        platform: platform,
        project: project,
      },
    }),
  });

  if (!result.ok) throw new Error("Failed to create a resource");

  try {
    return result.json();
  } catch {
    return null;
  }
};

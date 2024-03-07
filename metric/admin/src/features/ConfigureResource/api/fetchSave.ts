import { IResource } from "@/entities/Resource";

export const fetchSaveResource = async (
  resource: IResource
): Promise<IResource | null> => {
  const response = await fetch(
    `http://localhost:5173/api/resource/${resource.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) throw new Error("Failed to save resource data");

  try {
    return response.json();
  } catch {
    return null;
  }
};

import { IResource } from "@/entities/Resource";

export const fetchSaveResource = async (
  resource: IResource
): Promise<IResource | null> => {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + `resource/${resource.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resource: resource }),
    }
  );

  if (!response.ok) throw new Error("Failed to save resource data");

  try {
    return response.json();
  } catch {
    return null;
  }
};

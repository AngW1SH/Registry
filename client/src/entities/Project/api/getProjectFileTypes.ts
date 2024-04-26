export const getProjectFileTypes = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "api/project/file-type",
  );

  if (response.ok) {
    try {
      return response.json().then((data) => {
        return data.map((row: { id: number; name: string }) => row.name);
      });
    } catch {
      return [];
    }
  }

  return [];
};

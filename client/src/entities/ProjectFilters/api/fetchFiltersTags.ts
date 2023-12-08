export const fetchFiltersTags = async (
  query?: string,
): Promise<string[] | null> => {
  const data: { name: string }[] = await fetch(
    process.env.NEXT_PUBLIC_WEBSITE_URL + "api/tag/filters/" + query,
    {
      headers: {
        "Cache-Control": "no-cache",
      },
    },
  ).then((response) => {
    try {
      return response.ok ? response.json() : null;
    } catch {
      return null;
    }
  });

  return data.map((tag) => tag.name);
};

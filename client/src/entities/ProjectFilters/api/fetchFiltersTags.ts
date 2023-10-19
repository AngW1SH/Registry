export const fetchFiltersTags = async (query?: string) => {
  const data: { name: string }[] = await fetch(
    process.env.NEXT_PUBLIC_WEBSITE_URL + "api/tag/filters/" + query,
  ).then((response) => {
    if (!response.ok) return [];

    return response.json();
  });

  return data.map((tag) => tag.name);
};

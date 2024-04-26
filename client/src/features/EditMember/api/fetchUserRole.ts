export const fetchUserRole = async (query: string): Promise<string[]> => {
  const cachedResponse = await caches.match("api/user/role/" + query);

  if (cachedResponse) {
    const cacheData = await cachedResponse.json();
    const cacheTimestamp = new Date(cacheData.timestamp);
    const currentTime = new Date();

    // Check if the cached data is still valid (within the minute)
    if (+currentTime - +cacheTimestamp < 60000) {
      // 60000 milliseconds = 1 minute
      return cacheData.data;
    }
  }

  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "api/user/role/" + query,
    {
      headers: {
        "Cache-Control": "max-age=100, s-maxage=3600",
      },
    },
  );

  if (!response.ok) return [];

  const data: string[] = await response.json();

  try {
    caches.open("api/user/role/" + query).then((cache) => {
      cache.put(
        "api/user/role/" + query,
        new Response(
          JSON.stringify({ timestamp: new Date().toString(), data: data }),
        ),
      );
    });
  } catch {
    return data;
  }

  return data;
};

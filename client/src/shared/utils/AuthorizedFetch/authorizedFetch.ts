/*
Receiving a 401 may mean that just the access-token is expired.
AuthorizedFetch tries to update access-token once on 401
*/
export const authorizedFetch = async (url: RequestInfo, init?: RequestInit) => {
  const result = await fetch(url, init);
  if (result.status == 401) {
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/auth/token");
    const result = await fetch(url, init);

    return result;
  }
  return result;
};

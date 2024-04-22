import { authorizedFetch } from "@/shared/utils/AuthorizedFetch";

export const fetchUser = async () => {
  const result = await authorizedFetch(
    import.meta.env.VITE_SERVER_URL + "user/profile"
  );

  if (!result.ok) return null;

  try {
    return result.json();
  } catch {
    return null;
  }
};

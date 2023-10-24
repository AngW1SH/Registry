export type UserSidebarItemSlug =
  | "hero"
  | "forms"
  | "teams"
  | "projects"
  | "requests"
  | "profile";

export type UserSidebarItem = {
  slug: UserSidebarItemSlug;
  name: string;
};

"use client";
import { useProfileQuery } from "@/composites/Profile";
import { useAuthQuery } from "@/entities/User";
import { Container, LoadingCircle } from "@/shared/ui";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { UserHero } from "@/widgets/UserHero";
import { UserSidebar, UserSidebarItemSlug } from "@/widgets/UserSidebar";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

interface UserLayoutProps {
  children: ReactNode;
  params: {};
}

const slugs: UserSidebarItemSlug[] = [
  "hero",
  "forms",
  "profile",
  "projects",
  "requests",
  "teams",
];

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  const { data: user, isLoading: isUserLoading } = useAuthQuery();
  const router = useRouter();

  const { data: profile } = useProfileQuery();

  const path = usePathname();

  const slug = path.split("/")[2] as UserSidebarItemSlug;

  useEffect(() => {
    if (!user && !isUserLoading) router.push("/");
  }, [user, isUserLoading]);

  return (
    <>
      <Container>
        <div className="pt-6" />
        <Header text="dark" />
        <div className="pt-2" />
      </Container>
      <UserHero />
      <div className="pt-8" />
      <Container>
        <div className="flex flex-col gap-x-14 gap-y-8 xl:flex-row">
          <div className="whitespace-nowrap lg:w-full xl:w-max">
            <UserSidebar
              className="hidden md:flex md:flex-row md:justify-between md:text-sm lg:text-[0.9375rem] xl:flex-col"
              active={
                slug && slugs.includes(slug as UserSidebarItemSlug)
                  ? slug
                  : slugs[0]
              }
            />
          </div>
          {profile && <div className="w-full">{children}</div>}
          {!profile && (
            <div className="flex w-full justify-center py-10">
              <LoadingCircle />
            </div>
          )}
        </div>
      </Container>
      <div className="pt-32" />
      <Footer />
    </>
  );
};

export default UserLayout;

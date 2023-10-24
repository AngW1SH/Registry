"use client";
import { useAuthUserQuery } from "@/composites/AuthUser";
import { Container } from "@/shared/ui";
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
  const { data: user, isLoading } = useAuthUserQuery();
  const router = useRouter();

  const path = usePathname();

  const slug = path.split("/")[2] as UserSidebarItemSlug;

  useEffect(() => {
    if (!user && !isLoading) router.push("/");
  }, [user, isLoading]);

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
        <div className="flex gap-14">
          <div className="w-max whitespace-nowrap">
            <UserSidebar
              active={
                slug && slugs.includes(slug as UserSidebarItemSlug)
                  ? slug
                  : slugs[0]
              }
            />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </Container>
      <div className="pt-32" />
      <Footer />
    </>
  );
};

export default UserLayout;

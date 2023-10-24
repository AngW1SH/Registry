"use client";
import { useAuthUserQuery } from "@/composites/AuthUser";
import { Container } from "@/shared/ui";
import { Header } from "@/widgets/Header";
import { UserHero } from "@/widgets/UserHero";
import { UserSidebar } from "@/widgets/UserSidebar";
import { useParams, useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

interface UserLayoutProps {
  children: ReactNode;
  params: {};
}

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  const { data: user, isLoading } = useAuthUserQuery();
  const router = useRouter();

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
            <UserSidebar />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </Container>
    </>
  );
};

export default UserLayout;

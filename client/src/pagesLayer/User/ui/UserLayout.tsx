"use client";
import { useAuthUserQuery } from "@/composites/AuthUser";
import { Container } from "@/shared/ui";
import { Header } from "@/widgets/Header";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

interface UserLayoutProps {
  children: ReactNode;
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
      <div>{children}</div>
    </>
  );
};

export default UserLayout;

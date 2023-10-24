import { FC } from "react";
import UserName from "./UserName";
import { Container } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";

interface UserHeroProps {}

const UserHero: FC<UserHeroProps> = () => {
  return (
    <div className="bg-secondary">
      <Container className="pb-9 pt-12">
        <Link href="/projects">
          <div className="flex items-center">
            <div className="mr-3 h-[14px] w-[22px] rotate-180">
              <Image fill={true} src="/link-arrow-black-alt.svg" alt="" />
            </div>
            <p className="text-[#77787b]">Вернуться к списку проектов</p>
          </div>
        </Link>
        <div className="pt-9" />
        <UserName />
      </Container>
    </div>
  );
};

export default UserHero;

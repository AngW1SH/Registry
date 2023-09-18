import { FC } from "react";

interface HeroTitleProps {}

const HeroTitle: FC<HeroTitleProps> = () => {
  return (
    <h1 className="text-center text-4xl text-white sm:text-7xl md:text-left">
      Реестр проектов
    </h1>
  );
};

export default HeroTitle;

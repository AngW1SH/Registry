import { ButtonWithIcon } from "@/shared/ui";
import { FC } from "react";

interface HeroNavProps {}

const HeroNav: FC<HeroNavProps> = () => {
  return (
    <ul className="flex w-full flex-col justify-between gap-3 sm:flex-row">
      <ButtonWithIcon
        icon="/calendar-icon-black.svg"
        className="w-full gap-1 bg-white-rgba px-2 py-2 text-sm sm:py-4 lg:gap-5 lg:p-5 lg:text-base xl:text-lg"
      >
        Календарь проектов
      </ButtonWithIcon>
      <ButtonWithIcon
        icon="/offer-icon-black.svg"
        className="w-full gap-1 bg-white-rgba px-2 py-2 text-sm sm:py-4 lg:gap-5 lg:p-5 lg:text-base xl:text-lg"
      >
        Вакансии
      </ButtonWithIcon>
      <ButtonWithIcon
        icon="/filters-icon-black.svg"
        className="w-full gap-1 bg-secondary-rgba px-2 py-2 text-sm sm:py-4 lg:gap-5 lg:p-5 lg:text-base xl:text-lg"
      >
        Расширенный поиск
      </ButtonWithIcon>
    </ul>
  );
};

export default HeroNav;

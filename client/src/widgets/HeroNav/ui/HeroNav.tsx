import { ButtonWithIcon } from "@/shared/ui";
import { FC } from "react";

interface HeroNavProps {}

const HeroNav: FC<HeroNavProps> = () => {
  return (
    <ul className="flex w-full justify-between gap-3">
      <ButtonWithIcon
        icon="/calendar-icon-black.svg"
        className="bg-white-rgba w-full"
      >
        Календарь проектов
      </ButtonWithIcon>
      <ButtonWithIcon
        icon="/offer-icon-black.svg"
        className="bg-white-rgba w-full"
      >
        Вакансии
      </ButtonWithIcon>
      <ButtonWithIcon
        icon="/filters-icon-black.svg"
        className="bg-secondary-rgba w-full"
      >
        Расширенный поиск
      </ButtonWithIcon>
    </ul>
  );
};

export default HeroNav;

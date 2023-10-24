import { Block } from "@/shared/ui";
import Link from "next/link";
import { FC } from "react";

interface TeamDetailedCardProps {}

const TeamDetailedCard: FC<TeamDetailedCardProps> = () => {
  return (
    <Block className="rounded-xl py-12">
      <ul>
        <li className="px-10 [&:last-child>div]:border-b [&>div]:border-t [&>div]:border-[#b7b7b7]">
          <div className="flex items-center py-5">
            <p className="w-1/3">Продакт-менеджер</p>
            <p className="text-lg font-medium uppercase">Иванов С.А.</p>
            <p className="ml-10 text-[0.9375rem] text-primary">
              Представитель команды
            </p>
          </div>
        </li>
        <li className="-mb-px mt-px bg-secondary px-10 [&>div]:border-t [&>div]:border-[#b7b7b7]">
          <div className="flex items-center py-5">
            <p className="w-1/3">Бэкенд-разработчик</p>
            <p className="text-lg font-medium uppercase">Петров С.</p>
          </div>
        </li>
        <li className="px-10 [&:last-child>div]:border-b [&>div]:border-t [&>div]:border-[#b7b7b7]">
          <div className="flex items-center py-5">
            <p className="w-1/3">Фронтенд-разработчик</p>
            <p className="text-lg font-medium uppercase">Самойлова С.А.</p>
          </div>
        </li>
        <li className="px-10 [&:last-child>div]:border-b [&>div]:border-t [&>div]:border-[#b7b7b7]">
          <div className="flex items-center py-5">
            <p className="w-1/3">Тестировщик</p>
            <p className="text-lg font-medium uppercase">Вяземский С.Г.</p>
          </div>
        </li>
        <li className="px-10 [&:last-child>div]:border-b [&>div]:border-t [&>div]:border-[#b7b7b7]">
          <div className="flex items-center py-5">
            <p className="w-1/3">Технический писатель</p>
            <p className="text-lg font-medium uppercase">Кирьянов С.А.</p>
          </div>
        </li>
      </ul>
      <div className="px-10">
        <div className="pt-16" />
        <div>
          <p className="text-[0.8125rem] text-[#898989]">Проект команды</p>
          <p>Пока нет проекта</p>
        </div>
        <div className="pt-10" />
        <div>
          <p className="text-[0.8125rem] text-[#898989]">Заявки команды</p>
          <ul>
            <li>
              <Link href="/projects/1">
                Изучение социально-экономических проблем соверменного испанского
                общества
              </Link>
            </li>
            <li>
              <Link href="/projects/2">
                Биология растений в эпоху глобальных изменений климата
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Block>
  );
};

export default TeamDetailedCard;

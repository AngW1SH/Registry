import { Block, RoleTable } from "@/shared/ui";
import Image from "next/image";
import { FC } from "react";

interface ProjectInspectCardProps {}

const ProjectInspectCard: FC<ProjectInspectCardProps> = () => {
  const displayData = [
    {
      id: 1,
      role: "Продакт-менеджер",
      name: "Иванов С.А.",
      label: "Вы - представитель команды",
      selected: true,
    },
    {
      id: 2,
      role: "Бэкенд-разработчик",
      name: "Петров С.А.",
      label: null,
      selected: false,
    },
    {
      id: 3,
      role: "Фронтэнд-разработчик",
      name: "Самойлова С.А.",
      label: null,
      selected: false,
    },
    {
      id: 4,
      role: "Тестировщик",
      name: "Вяземский С.Г.",
      label: null,
      selected: false,
    },
    {
      id: 5,
      role: "Технический писатель",
      name: "Кирьянов С.А.",
      label: null,
      selected: false,
    },
  ];

  return (
    <Block className="overflow-hidden rounded-2xl">
      <div className="bg-[#f4f4f4] px-9 pb-7 pt-11">
        <div className="w-3/4">
          <h2 className="text-xl font-semibold">
            Изучение социально-экономических проблем соверменного испанского
            общества
          </h2>
          <div className="pt-5" />
          <div className="flex">
            <div className="w-1/3">
              <h3 className="text-[0.9375rem] text-[#898989]">
                Срок записи на проект
              </h3>
              <div className="pt-1" />
              <p className="text-[0.9375rem]">09.09.2023</p>
            </div>
            <div className="w-1/3">
              <h3 className="text-[0.9375rem] text-[#898989]">
                Срок реализации проекта
              </h3>
              <div className="pt-1" />
              <p>09.09.2023</p>
            </div>
            <div className="w-1/3">
              <h3 className="text-[0.9375rem] text-[#898989]">Руководитель</h3>
              <div className="pt-1" />
              <p>Иванов П.М.</p>
            </div>
          </div>
        </div>
        <div className="pt-4" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-primary">Подробнее о проекте</span>
          <Image src="/arrow-right-red.svg" alt="" height={12} width={7} />
        </div>
      </div>
      <div className="pb-11">
        <RoleTable displayData={displayData} />
      </div>
    </Block>
  );
};

export default ProjectInspectCard;

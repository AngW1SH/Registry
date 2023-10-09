import LabeledBlock from "@/shared/ui/LabeledBlock/LabeledBlock";
import { FC } from "react";

interface ProjectTeamProps {}

const ProjectTeam: FC<ProjectTeamProps> = () => {
  return (
    <LabeledBlock label="Состав команды">
      <ul>
        <li className="flex border-b border-[#b7b7b7] bg-white py-4 first:border-t">
          <p className="w-1/2">Продакт-менджер</p>
          <p className="text-lg font-medium">Иванов С.А.</p>
        </li>
        <li className="flex border-b border-[#b7b7b7] bg-white py-4">
          <p className="w-1/2">Бэкенд-разработчик</p>
          <p className="text-lg font-medium">Петров С.А.</p>
        </li>
        <li className="flex border-b border-[#b7b7b7] bg-white py-4">
          <p className="w-1/2">Фронтенд-разработчик</p>
          <p className="text-lg font-medium">Самойлова С.А.</p>
        </li>
        <li className="flex border-b border-[#b7b7b7] bg-white py-4">
          <p className="w-1/2">Аналитик</p>
          <p className="text-lg font-medium">Вяземский С.Г.</p>
        </li>
        <li className="flex border-b border-[#b7b7b7] bg-white py-4">
          <p className="w-1/2">Тестировщик, технический писатель</p>
          <p className="text-lg font-medium">Кирьянов С.А.</p>
        </li>
      </ul>
    </LabeledBlock>
  );
};

export default ProjectTeam;

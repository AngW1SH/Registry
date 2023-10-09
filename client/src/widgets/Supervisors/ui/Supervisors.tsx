import { FC } from "react";

interface SupervisorsProps {
  className?: string;
}

const Supervisors: FC<SupervisorsProps> = ({ className = " " }) => {
  return (
    <ul className={"flex flex-col gap-1 " + className}>
      <li className="flex items-center bg-[#f4f4f4] px-4 py-5">
        <p className="w-1/5 text-sm text-[#848689]">Заказчик</p>
        <p>НИИ Социальных технологий и развития</p>
      </li>
      <li className="flex items-center bg-[#f4f4f4] px-4 py-5">
        <p className="w-1/5 text-sm text-[#848689]">Куратор</p>
        <p>Широкова Светлана Валерьевна</p>
      </li>
      <li className="flex items-center bg-[#f4f4f4] px-4 py-5">
        <p className="w-1/5 text-sm text-[#848689]">Руководитель</p>
        <p>Иванов Михаил Михайлович</p>
      </li>
    </ul>
  );
};

export default Supervisors;

import { Block, ButtonAlt } from "@/shared/ui";
import { FC } from "react";

interface RequestInspectCardProps {}

const RequestInspectCard: FC<RequestInspectCardProps> = () => {
  return (
    <Block className="w-full rounded-2xl px-11 py-8">
      <div className="w-3/4">
        <h3 className="text-sm text-[#898989]">Заявка на проект</h3>
        <div className="pt-1" />
        <p className="text-lg">
          Биология растений и динамика в эпоху глобальных изменений климата
        </p>
        <div className="pt-9" />
        <h3 className="text-sm text-[#898989]">Команда</h3>
        <div className="pt-1" />
        <ul className="flex flex-wrap">
          <li className="w-[45%]">Габрахманов С.А.</li>
          <li className="w-[45%]">Петраковский С.А.</li>
          <li className="w-[45%]">Сергеева А.Л.</li>
          <li className="w-[45%]">Иванов А.Л.</li>
          <li className="w-[45%]">Вяземский А.К.</li>
        </ul>
        <div className="pt-9" />
        <h3 className="text-sm text-[#898989]">Статус</h3>
        <div className="pt-1" />
        <div className="text-xl font-semibold">
          <p>В рассмотрении</p>
        </div>
        <div className="pt-4" />
        <ButtonAlt className="rounded-full border px-16 py-[0.65rem]">
          Отозвать
        </ButtonAlt>
      </div>
    </Block>
  );
};

export default RequestInspectCard;

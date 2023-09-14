import { ButtonAlt } from "@/shared/ui";
import { FC } from "react";

interface SuggestProjectProps {
  className?: string;
}

const SuggestProject: FC<SuggestProjectProps> = ({ className = "" }) => {
  return (
    <div className={"bg-primary px-10 py-20 text-white " + className}>
      <h2 className="text-[1.8rem] font-medium uppercase leading-9 text-white">
        Предложить тему
        <br /> проекта
      </h2>
      <div className="pt-10" />
      <ButtonAlt className="w-max px-12">Связаться</ButtonAlt>
      <div className="pt-10" />
      <p className="text-sm leading-6 text-white">
        Наши команды специалистов готовы
        <br />к сотрудничеству, <br />
        выполнению самых
        <br />
        нестандартных и <br />
        нетривиальных <br />
        задач
      </p>
    </div>
  );
};

export default SuggestProject;

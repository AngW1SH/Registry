import { Button } from "@/shared/ui";
import { FC } from "react";

interface EditProjectProps {}

const EditProject: FC<EditProjectProps> = () => {
  return (
    <div>
      <h2 className="text-sm text-[#898989]">Отчёты</h2>
      <div className="pt-3" />
      <Button className="rounded-full px-8 py-2">Добавить отчёт</Button>
      <div className="pt-4" />
      <div>
        <div className="flex border-y border-[#b7b7b7]">
          <div className="w-1/5 pt-4">22.11.2023</div>
          <div className="w-4/5">
            <div className="border-b border-[#b7b7b7] py-4">Отчёт 1</div>
            <div className="py-4">Отчёт 2</div>
          </div>
        </div>
        <div className="flex border-b border-[#b7b7b7]">
          <div className="w-1/5 pt-4">23.11.2023</div>
          <div>
            <div className="py-4">Отчёт 1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProject;

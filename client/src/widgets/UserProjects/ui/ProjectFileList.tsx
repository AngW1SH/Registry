import { ChangeProjectFile, DeleteProjectFile } from "@/features/EditProject";
import { Button } from "@/shared/ui";
import Link from "next/link";
import { FC } from "react";

interface ProjectFileListProps {}

const ProjectFileList: FC<ProjectFileListProps> = () => {
  return (
    <div>
      <h2 className="text-sm text-[#898989]">Отчёты</h2>
      <div className="pt-3" />
      <Button className="rounded-full px-8 py-2">Добавить отчёт</Button>
      <div className="pt-4" />
      <div>
        <div className="flex border-y border-[#b7b7b7]">
          <div className="w-1/5 pt-4">23.11.2023</div>
          <div className="w-4/5">
            <div className="relative border-b border-[#b7b7b7] py-4">
              <p>Отчёт 1</p>
              <DeleteProjectFile className="absolute right-10 top-1/2 -translate-y-1/2" />
              <ChangeProjectFile className="absolute right-0 top-1/2 -translate-y-1/2" />
            </div>
            <div className="py-4">
              <Link href="">Отчёт 2</Link>
            </div>
          </div>
        </div>
        <div className="flex border-b border-[#b7b7b7]">
          <div className="w-1/5 pt-4">22.11.2023</div>
          <div>
            <div className="py-4">Отчёт 1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFileList;

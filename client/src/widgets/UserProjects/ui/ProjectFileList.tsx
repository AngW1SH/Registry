import { UserProject } from "@/composites/ProjectInspect";
import { IProject, IProjectSingle } from "@/entities/Project";
import {
  AddProjectFiles,
  ChangeProjectFile,
  DeleteProjectFile,
} from "@/features/EditProject";
import { NamedFile } from "@/shared/types";
import { Button } from "@/shared/ui";
import Link from "next/link";
import { FC } from "react";

interface ProjectFileListProps {
  project: UserProject;
}

const ProjectFileList: FC<ProjectFileListProps> = ({ project }) => {
  const files: any = {};

  project.documents.forEach((file) => {
    if (files[file.date]) {
      files[file.date].push({ ...file, category: file.category });
    } else {
      files[file.date] = [{ ...file, category: file.category }];
    }
  });

  const dates = Object.keys(files);

  return (
    <div>
      <h2 className="text-sm text-[#898989]">Отчёты</h2>
      <div className="pt-3" />
      <div className="rounded-lg border border-[#898989] p-5">
        <h2 className="text-sm text-[#898989]">Новый отчёт</h2>
        <div className="pt-3" />
        <AddProjectFiles projectId={project.id} />
      </div>
      <div className="pt-4" />
      <div>
        {dates.map((date) => (
          <div
            key={date}
            className="flex border-t border-[#b7b7b7] last:border-b"
          >
            <div className="w-1/5 pt-4">
              {new Date(date).toLocaleDateString("ru-RU", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </div>
            <div className="w-4/5">
              {files[date].map((file: NamedFile & { category: string }) => (
                <div
                  key={file.id + "-" + file.url}
                  className="relative flex flex-col border-b border-[#b7b7b7] py-4 last:border-none lg:flex-row"
                >
                  <p
                    className="overflow-hidden overflow-ellipsis lg:max-w-[35%]"
                    title={file.name}
                  >
                    {file.name}
                  </p>
                  <p className="lg:ml-10 lg:max-w-[35%] lg:border-l lg:border-black lg:pl-10">
                    {file.category}
                  </p>
                  <DeleteProjectFile
                    projectId={project.id}
                    fileId={file.id}
                    className="absolute right-10 top-1/2 -translate-y-1/2"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectFileList;

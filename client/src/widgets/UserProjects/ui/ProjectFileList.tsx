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

  project.resultFiles.forEach((file) => {
    if (files[file.date]) {
      files[file.date].push(file);
    } else {
      files[file.date] = [file];
    }
  });

  const dates = Object.keys(files);

  return (
    <div>
      <h2 className="text-sm text-[#898989]">Отчёты</h2>
      <div className="pt-3" />
      <AddProjectFiles projectId={project.id} />
      <div className="pt-4" />
      <div>
        {dates.map((date) => (
          <div
            key={date}
            className="flex border-t border-[#b7b7b7] last:border-b"
          >
            <div className="w-1/5 pt-4">{date}</div>
            <div className="w-4/5">
              {files[date].map((file: NamedFile) => (
                <div
                  key={file.id + "-" + file.url}
                  className="relative border-b border-[#b7b7b7] py-4 last:border-none"
                >
                  <p>{file.name}</p>
                  <DeleteProjectFile
                    projectId={project.id}
                    fileId={file.id}
                    className="absolute right-10 top-1/2 -translate-y-1/2"
                  />
                  <ChangeProjectFile
                    projectId={project.id}
                    fileId={file.id}
                    className="absolute right-0 top-1/2 -translate-y-1/2"
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

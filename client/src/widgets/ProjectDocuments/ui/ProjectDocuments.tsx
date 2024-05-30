import { IProjectDocument } from "@/entities/Project";
import { File } from "@/shared/ui";
import LabeledBlock from "@/shared/ui/LabeledBlock/LabeledBlock";
import { FC } from "react";

interface ProjectDocumentsProps {
  documents: IProjectDocument[];
}

const ProjectDocuments: FC<ProjectDocumentsProps> = ({ documents }) => {
  return (
    <LabeledBlock label="Результаты работы">
      {documents.map((file) => (
        <div className="flex w-full max-w-full flex-col items-center pb-8 text-sm sm:flex-row sm:pb-4">
          <p className="border-[#b7b7b7] text-center text-base sm:mr-5 sm:min-w-[33%] sm:max-w-[33%] sm:border-r sm:pr-5 sm:text-left sm:text-sm">
            {file.category}
          </p>
          <File
            className="max-w-[90%]"
            key={file.id}
            label={file.name}
            link={file.url}
            type={file.type}
            size={file.size}
          />
        </div>
      ))}
    </LabeledBlock>
  );
};

export default ProjectDocuments;

import { IProjectSingle } from "@/entities/Project/types/types";
import { File } from "@/shared/ui";
import LabeledBlock from "@/shared/ui/LabeledBlock/LabeledBlock";
import { FC } from "react";

interface ProjectDescriptionProps {
  project: IProjectSingle;
}

const ProjectDescription: FC<ProjectDescriptionProps> = ({ project }) => {
  return (
    <LabeledBlock label="Описание проекта">
      <p className="text-center lg:text-left">{project.description}</p>
      <div className="pt-10" />
      {project.descriptionFiles.map((file) => (
        <File
          key={file.id}
          label={file.name}
          link={file.url}
          type={"PDF"}
          size={"92 Кб"}
        />
      ))}
    </LabeledBlock>
  );
};

export default ProjectDescription;

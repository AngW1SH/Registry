import { IProject } from "@/entities/Project";
import { File } from "@/shared/ui";
import LabeledBlock from "@/shared/ui/LabeledBlock/LabeledBlock";
import { FC } from "react";

interface ProjectDescriptionProps {
  project: IProject;
}

const ProjectDescription: FC<ProjectDescriptionProps> = ({ project }) => {
  return (
    <LabeledBlock label="Описание проекта">
      <p>{project.description}</p>
      <div className="pt-10" />
      <File
        label={"Презентация проекта"}
        link={"/projects/123"}
        type={"PDF"}
        size={"92 Кб"}
      />
    </LabeledBlock>
  );
};

export default ProjectDescription;

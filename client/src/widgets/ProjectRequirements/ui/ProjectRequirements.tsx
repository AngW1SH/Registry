import { IProject } from "@/entities/Project";
import LabeledBlock from "@/shared/ui/LabeledBlock/LabeledBlock";
import { FC } from "react";

interface ProjectRequirementsProps {
  project: IProject;
}

const ProjectRequirements: FC<ProjectRequirementsProps> = ({ project }) => {
  return (
    <LabeledBlock
      label="Требования для исполнителей"
      labelClassName="text-xl lg:text-base xl:text-2xl"
    >
      <ul>
        {project.developerRequirements.map((requirement) => (
          <li
            key={requirement}
            className="relative border-b border-[#b7b7b7] bg-white py-6 after:absolute after:left-0 after:top-7 after:block after:h-5 after:w-6 after:bg-[url('/checked-icon-red.svg')] after:bg-contain after:bg-no-repeat first:border-t"
          >
            <p className="pl-16">{requirement}</p>
          </li>
        ))}
      </ul>
    </LabeledBlock>
  );
};

export default ProjectRequirements;

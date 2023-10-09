import LabeledBlock from "@/shared/ui/LabeledBlock/LabeledBlock";
import { FC } from "react";

interface ProjectRequirementsProps {}

const ProjectRequirements: FC<ProjectRequirementsProps> = () => {
  return (
    <LabeledBlock label="Требования для исполнителей">
      <ul>
        <li className="relative border-b border-[#b7b7b7] bg-white py-6 after:absolute after:left-0 after:top-9 after:block after:h-5 after:w-6 after:bg-[url('/checked-icon-red.svg')] after:bg-contain after:bg-no-repeat first:border-t">
          <p className="pl-16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            lectus lorem, tristique at cursus ac, tincidunt eget ex. Nam non
            nibh elementum, malesuada odio eget, pretium elit. Aliquam sit amet
            condimentum velit. Nam convallis porttitor velit sed rhoncus.
          </p>
        </li>
        <li className="relative border-b border-[#b7b7b7] bg-white py-6 after:absolute after:left-0 after:top-9 after:block after:h-5 after:w-6 after:bg-[url('/checked-icon-red.svg')] after:bg-contain after:bg-no-repeat first:border-t">
          <p className="pl-16">
            Lorem ipsum dolor sit suada odio eget, pretium elit. Aliquam sit
            amet condimentum velit. Nam convallis porttitor velit sed rhoncus.
          </p>
        </li>
        <li className="relative border-b border-[#b7b7b7] bg-white py-6 after:absolute after:left-0 after:top-9 after:block after:h-5 after:w-6 after:bg-[url('/checked-icon-red.svg')] after:bg-contain after:bg-no-repeat first:border-t">
          <p className="pl-16">
            Lorem ipsum dolor sit suada odio eget, pretium elit. Aliquam sit
            amet condimentum velit. Nam convallis porttitor velit sed rhoncus.
          </p>
        </li>
      </ul>
    </LabeledBlock>
  );
};

export default ProjectRequirements;

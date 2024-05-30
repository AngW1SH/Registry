import GithubIcon from "@/shared/ui/Icons/GithubIcon";
import { FC, SVGProps } from "react";

interface ProjectLinkIconProps extends SVGProps<SVGSVGElement> {
  name: string;
}

const ProjectLinkIcon: FC<ProjectLinkIconProps> = ({ name, ...props }) => {
  switch (name.toLowerCase()) {
    case "github":
      return <GithubIcon {...props} />;
    default:
      return <></>;
  }
};

export default ProjectLinkIcon;

import { FC, SVGProps } from "react";
import { GithubIcon } from "@/shared/ui/";

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

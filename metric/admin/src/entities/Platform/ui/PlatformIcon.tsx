import { FC, SVGProps } from "react";
import { PlatformName } from "../types";
import { GitLabIcon, GithubIcon, TrelloIcon } from "@/shared/ui/Icons";

interface PlatformIconProps extends SVGProps<SVGSVGElement> {
  name: PlatformName;
}

const PlatformIcon: FC<PlatformIconProps> = ({ name, ...props }) => {
  switch (name) {
    case PlatformName.GitHub:
      return <GithubIcon {...props} />;
    case PlatformName.GitLab:
      return <GitLabIcon {...props} />;
    case PlatformName.Trello:
      return <TrelloIcon {...props} />;
    default:
      return <></>;
  }
};

export default PlatformIcon;

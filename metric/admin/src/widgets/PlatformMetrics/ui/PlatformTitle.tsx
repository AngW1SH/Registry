import { ArrowDown, GithubIcon } from "@/shared/ui/Icons";
import { TextWithIcon } from "@/shared/ui/TextWithIcon";
import { FC } from "react";

interface PlatformTitleProps {
  opened?: boolean;
}

const PlatformTitle: FC<PlatformTitleProps> = ({ opened = true }) => {
  return (
    <div className="flex items-center justify-between px-7 py-4 rounded-lg bg-background">
      <TextWithIcon size={33} icon={<GithubIcon />}>
        AngW1SH/Registry
      </TextWithIcon>
      <div className={`transition-transform ${opened ? "" : "rotate-180"}`}>
        <ArrowDown height="15" width="24" />
      </div>
    </div>
  );
};

export default PlatformTitle;

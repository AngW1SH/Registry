import { ArrowDown, GithubIcon } from "@/shared/ui/Icons";
import { TextWithIcon } from "@/shared/ui/TextWithIcon";
import { FC } from "react";

interface PlatformTitleProps {
  title: string;
  opened?: boolean;
}

const PlatformTitle: FC<PlatformTitleProps> = ({ title, opened = true }) => {
  return (
    <div className="flex items-center justify-between px-7 py-4 rounded-lg bg-background">
      <TextWithIcon className="font-medium" size={33} icon={<GithubIcon />}>
        {title}
      </TextWithIcon>
      <div className={`transition-transform ${opened ? "" : "rotate-180"}`}>
        <ArrowDown height="15" width="24" />
      </div>
    </div>
  );
};

export default PlatformTitle;

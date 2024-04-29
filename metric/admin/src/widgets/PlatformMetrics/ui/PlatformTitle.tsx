import { PlatformIcon } from "@/entities/Platform";
import { PlatformName } from "@/entities/Platform/types";
import { ArrowDown } from "@/shared/ui/Icons";
import { TextWithIcon } from "@/shared/ui/TextWithIcon";
import { FC } from "react";

interface PlatformTitleProps {
  title: string;
  platform: PlatformName;
  opened?: boolean;
}

const PlatformTitle: FC<PlatformTitleProps> = ({
  title,
  platform,
  opened = true,
}) => {
  return (
    <div className="flex items-center justify-between px-7 py-4 rounded-lg bg-background">
      <TextWithIcon
        className="font-medium"
        size={33}
        icon={<PlatformIcon name={platform} />}
      >
        {title}
      </TextWithIcon>
      <div className={`transition-transform ${opened ? "" : "rotate-180"}`}>
        <ArrowDown height="15" width="24" />
      </div>
    </div>
  );
};

export default PlatformTitle;

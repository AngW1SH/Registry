import { FC, ReactElement, SVGAttributes } from "react";

interface ResourceProps {
  icon: ReactElement<SVGAttributes<SVGSVGElement>>;
  platform: string;
  title: string;
  url?: string;
}

const Resource: FC<ResourceProps> = ({ icon, platform, title, url }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <div className="flex gap-4 items-center">
        <div className="h-16 w-16 p-[13px] bg-background rounded-lg flex justify-center items-center">
          {icon}
        </div>
        <div>
          <h3 className="text-lg text-[#404040] font-semibold">{platform}</h3>
          <p className="text-[#AEAEAE] mt-1">{title}</p>
        </div>
      </div>
    </a>
  );
};

export default Resource;

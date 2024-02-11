import { SettingsIcon } from "@/shared/ui/Icons";
import { TextWithIcon } from "@/shared/ui/TextWithIcon";
import { FC } from "react";

interface ConfigureProjectProps {}

const ConfigureProject: FC<ConfigureProjectProps> = () => {
  return (
    <button className="bg-background flex justify-center rounded-lg py-4 text-[#A3AED0] font-medium">
      <TextWithIcon icon={<SettingsIcon />}>Configure Project</TextWithIcon>
    </button>
  );
};

export default ConfigureProject;

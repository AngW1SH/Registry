import { SettingsIcon } from "@/shared/ui/Icons";
import { TextWithIcon } from "@/shared/ui/TextWithIcon";
import { FC } from "react";
import { Link } from "react-router-dom";

interface ConfigureProjectProps {
  link: string;
}

const ConfigureProject: FC<ConfigureProjectProps> = ({ link }) => {
  return (
    <Link
      to={link}
      className="bg-background flex justify-center rounded-lg py-4 text-[#A3AED0] font-medium"
    >
      <TextWithIcon icon={<SettingsIcon />}>Configure Project</TextWithIcon>
    </Link>
  );
};

export default ConfigureProject;

import { FC, SVGProps } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface PauseIconProps extends SVGProps<SVGSVGElement> {}

const PauseIcon: FC<PauseIconProps> = (props) => {
  return (
    <GenericIcon hasStroke={true} viewBox="0 0 24 24" {...props}>
      <path
        d="M8 5V19M16 5V19"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </GenericIcon>
  );
};

export default PauseIcon;

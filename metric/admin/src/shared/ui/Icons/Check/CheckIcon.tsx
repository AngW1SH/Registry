import { FC, SVGProps } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface CheckIconProps extends SVGProps<SVGSVGElement> {}

const CheckIcon: FC<CheckIconProps> = (props) => {
  return (
    <GenericIcon hasStroke={true} viewBox="0 0 13 10" {...props}>
      <path
        fill="none"
        d="M11.75 1.5625L4.53125 8.78125L1.25 5.5"
        strokeWidth="1.6666"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </GenericIcon>
  );
};

export default CheckIcon;

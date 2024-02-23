import { FC, SVGAttributes } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface XCircleIconProps extends SVGAttributes<SVGSVGElement> {}

const XCircleIcon: FC<XCircleIconProps> = (props) => {
  return (
    <GenericIcon viewBox="0 0 28 28" hasStroke={true} {...props}>
      <circle cx="14" cy="14" r="10.5" fill="none" />
      <path d="M10.5001 17.4996L17.5001 10.4996" />
      <path d="M17.5 17.5L10.5 10.5" />
    </GenericIcon>
  );
};

export default XCircleIcon;

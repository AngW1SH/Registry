import { FC, SVGAttributes } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface PencilCircleIconProps extends SVGAttributes<SVGSVGElement> {}

const PencilCircleIcon: FC<PencilCircleIconProps> = (props) => {
  return (
    <GenericIcon viewBox="0 0 38 38" hasStroke={false} {...props}>
      <path
        className="cls-1"
        d="M1656,462.425a18.925,18.925,0,1,1,18.92-18.925A18.939,18.939,0,0,1,1656,462.425Zm0-36.85a17.925,17.925,0,1,0,17.92,17.925A17.943,17.943,0,0,0,1656,425.575Zm-8.56,26.832,0.56-4.136,13.09-13.776,3.59,3.416-13.09,13.78Zm1.51-3.681-0.34,2.464,2.49-.428,12.17-12.815-2.15-2.038Z"
        transform="translate(-1637.06 -424.562)"
      />
    </GenericIcon>
  );
};

export default PencilCircleIcon;

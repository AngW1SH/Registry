import { FC, SVGAttributes } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface TrashCircleIconProps extends SVGAttributes<SVGSVGElement> {}

const TrashCircleIcon: FC<TrashCircleIconProps> = (props) => {
  return (
    <GenericIcon viewBox="0 0 38 38" hasStroke={false} {...props}>
      <path
        className="cls-1"
        d="M1716,462.424a18.924,18.924,0,1,1,18.93-18.924A18.947,18.947,0,0,1,1716,462.424Zm0-36.848a17.924,17.924,0,1,0,17.93,17.924A17.951,17.951,0,0,0,1716,425.576Zm5.39,26.952h-10.78l-1.24-14.334h13.26Zm-9.86-1h8.94l1.07-12.334h-11.08Zm12.88-15.523h-16.82v-1h16.82v1Z"
        transform="translate(-1697.06 -424.562)"
      />
    </GenericIcon>
  );
};

export default TrashCircleIcon;

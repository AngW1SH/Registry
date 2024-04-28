import { FC, SVGAttributes } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface PlusCircleIconProps extends SVGAttributes<SVGSVGElement> {}

const PlusCircleIcon: FC<PlusCircleIconProps> = (props) => {
  return (
    <GenericIcon viewBox="0 0 27 27" hasStroke={true} {...props}>
      <path
        className="cls-1"
        d="M731.5,247.889A13.389,13.389,0,1,1,744.889,234.5,13.4,13.4,0,0,1,731.5,247.889Zm0-25.278A11.889,11.889,0,1,0,743.389,234.5,11.9,11.9,0,0,0,731.5,222.611Zm0.75,16.729h-1.5v-9.68h1.5v9.68Zm4.09-4.09h-9.681v-1.5h9.681v1.5Z"
        transform="translate(-718.125 -221.125)"
      />
    </GenericIcon>
  );
};

export default PlusCircleIcon;

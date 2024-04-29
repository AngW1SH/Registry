import { FC, SVGProps } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface PlusIconProps extends SVGProps<SVGSVGElement> {}

const PlusIcon: FC<PlusIconProps> = (props) => {
  return (
    <GenericIcon hasStroke={false} viewBox="0 0 15.124 15.124" {...props}>
      <path
        className="cls-1"
        d="M688,565.063h-2V549.937h2v15.126Zm6.563-6.563H679.437v-2h15.126v2Z"
        transform="translate(-679.438 -549.938)"
      />
    </GenericIcon>
  );
};

export default PlusIcon;

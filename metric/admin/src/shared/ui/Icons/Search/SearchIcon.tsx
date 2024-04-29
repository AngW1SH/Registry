import { FC, SVGProps } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface SearchIconProps extends SVGProps<SVGSVGElement> {}

const SearchIcon: FC<SearchIconProps> = (props) => {
  return (
    <GenericIcon hasStroke={false} viewBox="0 0 14.5 17.312" {...props}>
      <path
        className="cls-1"
        d="M438.213,861.735a6.952,6.952,0,1,1,6.951-6.952A6.959,6.959,0,0,1,438.213,861.735Zm0-12.833a5.882,5.882,0,1,0,5.882,5.881A5.888,5.888,0,0,0,438.213,848.9Zm6.64,16.266-3.166-4.668,0.885-.6,3.166,4.667Z"
        transform="translate(-431.25 -847.844)"
      />
    </GenericIcon>
  );
};

export default SearchIcon;

import { FC, SVGProps } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface RefreshIconProps extends SVGProps<SVGSVGElement> {}

const RefreshIcon: FC<RefreshIconProps> = (props) => {
  return (
    <GenericIcon hasStroke={false} viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2929 1.29289C10.6834 0.902369 11.3166 0.902369 11.7071 1.29289L14.7071 4.29289C14.8946 4.48043 15 4.73478 15 5C15 5.26522 14.8946 5.51957 14.7071 5.70711L11.7071 8.70711C11.3166 9.09763 10.6834 9.09763 10.2929 8.70711C9.90237 8.31658 9.90237 7.68342 10.2929 7.29289L11.573 6.01281C7.90584 6.23349 5 9.2774 5 13C5 16.866 8.13401 20 12 20C15.866 20 19 16.866 19 13C19 12.4477 19.4477 12 20 12C20.5523 12 21 12.4477 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.16524 6.81226 4.22089 11.5947 4.00896L10.2929 2.70711C9.90237 2.31658 9.90237 1.68342 10.2929 1.29289Z"
      />
    </GenericIcon>
  );
};

export default RefreshIcon;

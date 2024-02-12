import { FC, SVGAttributes } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface GitLabIconProps extends SVGAttributes<SVGSVGElement> {}

const GitLabIcon: FC<GitLabIconProps> = (props) => {
  return (
    <GenericIcon viewBox="0 0 39 36" {...props}>
      <path d="M19.5 36L27 14H12L19.5 36Z" fill="#D74B3A" />
      <path d="M19 36L11.9123 14H2L19 36Z" fill="#F36F3C" />
      <path
        d="M2.20414 14L0.069956 20.6833C-0.120906 21.2861 0.0873072 21.9597 0.590489 22.332L19 36L2.20414 14Z"
        fill="#F3993F"
      />
      <path
        d="M2 14H12L7.68905 0.526858C7.47703 -0.175619 6.5053 -0.175619 6.29329 0.526858L2 14Z"
        fill="#D74B3A"
      />
      <path d="M19 36L26.4969 14H37L19 36Z" fill="#F36F3C" />
      <path
        d="M36.6799 14L38.9264 20.6833C39.1273 21.2861 38.9081 21.9597 38.3784 22.332L19 36L36.6799 14Z"
        fill="#F3993F"
      />
      <path
        d="M37 14H27L31.2933 0.513844C31.523 -0.171281 32.477 -0.171281 32.689 0.513844L37 14Z"
        fill="#D74B3A"
      />
    </GenericIcon>
  );
};

export default GitLabIcon;

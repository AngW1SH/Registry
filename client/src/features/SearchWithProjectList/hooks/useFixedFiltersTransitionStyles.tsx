import { useMemo } from "react";

export const useFixedHeaderTransitionStyles = (
  height: number,
  areLargeFiltersVisible: boolean,
) => {
  const defaultStyles = useMemo(
    () => ({
      height: height + "px",
      top: "-" + height + "px",
    }),
    [height, areLargeFiltersVisible],
  );

  const transitionStyles = useMemo(
    () => ({
      entering: {
        top: "0px",
        transition: !areLargeFiltersVisible
          ? `top ${300}ms cubic-bezier(0.4, 0, 0.2, 1)`
          : `none`,
      },
      entered: { top: "0px" },
      exiting: {
        top: "-" + height + "px",
        transition: !areLargeFiltersVisible
          ? `top ${300}ms cubic-bezier(0.4, 0, 0.2, 1)`
          : `none`,
      },
      exited: { top: "-" + height + "px" },
      unmounted: { top: "-" + height + "px" },
    }),
    [height, areLargeFiltersVisible],
  );

  return { defaultStyles, transitionStyles };
};

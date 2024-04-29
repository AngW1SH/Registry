import { ReactNode, RefObject, useCallback, useEffect, useState } from "react";

export const useActionsToggleOpen = (
  ref: RefObject<HTMLElement>,
  element: ReactNode
) => {
  const [height, setHeight] = useState(0);

  const updateSize = useCallback(() => {
    if (ref.current) setHeight(ref.current.clientHeight);
  }, [ref.current]);

  useEffect(() => {
    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [ref.current, element]);

  const defaultStyle = {
    transition: `height ${150}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    height: 0,
  };

  const transitionStyles = {
    entering: { height: height },
    entered: { height: height },
    exiting: { height: 0 },
    exited: { height: 0 },
    unmounted: { height: 0 },
  };

  return {
    styles: { default: defaultStyle, transition: transitionStyles },
  };
};

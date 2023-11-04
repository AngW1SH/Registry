"use client";
import { RefObject, useCallback, useEffect, useState } from "react";

export const useToggleOpen = (ref: RefObject<HTMLElement>) => {
  const [opened, setOpened] = useState(false);
  const [innerHeight, setInnerHeight] = useState(0);

  const updateSize = useCallback(() => {
    if (ref.current) setInnerHeight(ref.current.clientHeight);
  }, [ref.current]);

  useEffect(() => {
    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [ref.current]);

  const handleToggle = useCallback(() => {
    updateSize();
    setOpened((prevOpened) => !prevOpened);
  }, []);

  const defaultStyle = {
    transition: `height ${150}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    height: 0,
  };

  const transitionStyles = {
    entering: { height: innerHeight },
    entered: { height: innerHeight },
    exiting: { height: 0 },
    exited: { height: 0 },
    unmounted: { height: 0 },
  };

  return {
    opened,
    toggleOpened: handleToggle,
    styles: { default: defaultStyle, transition: transitionStyles },
  };
};

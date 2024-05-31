"use client";
import {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export const useToggleOpen = (
  ref: RefObject<HTMLElement>,
  element: ReactNode,
) => {
  const [opened, setOpened] = useState(false);
  const [innerHeight, setInnerHeight] = useState(0);

  const updateSize = useCallback(() => {
    if (ref.current) setInnerHeight(ref.current.clientHeight);
  }, [ref.current]);

  useLayoutEffect(() => {
    updateSize();

    let observer: ResizeObserver | undefined;

    if (ref.current) {
      observer = new ResizeObserver(updateSize);
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer?.unobserve(ref.current);
    };
  }, [ref.current, element]);

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

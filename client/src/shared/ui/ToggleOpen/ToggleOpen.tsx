"use client";
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Transition, TransitionStatus } from "react-transition-group";

interface ToggleOpenProps {
  triggerElement: ReactNode;
  children: ReactNode;
  open?: boolean;
}

const ToggleOpen: FC<ToggleOpenProps> = ({
  triggerElement,
  children,
  open = false,
}) => {
  const [opened, setOpened] = useState(open);
  const [innerHeight, setInnerHeight] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const updateSize = useCallback(() => {
    if (innerRef.current) setInnerHeight(innerRef.current.clientHeight);
  }, [innerRef.current]);

  useEffect(() => {
    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [innerRef.current]);

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

  return (
    <Transition in={opened} timeout={150}>
      {(state: TransitionStatus) => (
        <div
          className={`relative ${
            state == "entered" ? "overflow-visible" : "overflow-hidden"
          }`}
        >
          <div
            onClick={handleToggle}
            className="relative cursor-pointer bg-white"
          >
            {triggerElement}
          </div>
          <div
            ref={ref}
            className="relative"
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <div>
              <div ref={innerRef}>{children}</div>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default ToggleOpen;

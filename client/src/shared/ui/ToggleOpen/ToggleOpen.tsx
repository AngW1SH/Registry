"use client";
import {
  FC,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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

  const innerRef = useRef<HTMLDivElement>(null);

  const updateSize = useCallback(() => {
    if (innerRef.current) setInnerHeight(innerRef.current.clientHeight);
  }, [innerRef.current]);

  useLayoutEffect(() => {
    updateSize();
  }, []);

  const handleToggle = useCallback(() => {
    setOpened((prevOpened) => !prevOpened);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        onClick={handleToggle}
        className="relative z-20 cursor-pointer bg-white"
      >
        {triggerElement}
      </div>
      <div
        className="relative z-10 transition-all"
        style={{
          height: opened ? innerHeight : 0,
        }}
      >
        <div ref={innerRef}>{children}</div>
      </div>
    </div>
  );
};

export default ToggleOpen;

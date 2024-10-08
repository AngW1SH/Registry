"use client";
import { useToggleOpen } from "@/shared/hooks/useToggleOpen";
import { FC, ReactNode, useEffect, useRef } from "react";
import { Transition, TransitionStatus } from "react-transition-group";

interface ToggleOpenProps {
  triggerElement: ReactNode;
  children: ReactNode;
  callback?: (opened: boolean) => void;
}

const ToggleOpen: FC<ToggleOpenProps> = ({
  triggerElement,
  children,
  callback,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const nodeRef = useRef(null);

  const { opened, toggleOpened, styles } = useToggleOpen(ref, children);

  useEffect(() => {
    if (callback) callback(opened);
  }, [opened]);

  return (
    <Transition nodeRef={nodeRef} in={opened} timeout={150}>
      {(state: TransitionStatus) => (
        <div
          ref={nodeRef}
          className={`relative ${
            state == "entered" ? "overflow-visible" : "overflow-hidden"
          }`}
        >
          <div onClick={toggleOpened} className="relative">
            {triggerElement}
          </div>
          <div
            className="relative"
            style={{
              ...styles.default,
              ...styles.transition[state],
            }}
          >
            <div>
              <div ref={ref}>{children}</div>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default ToggleOpen;

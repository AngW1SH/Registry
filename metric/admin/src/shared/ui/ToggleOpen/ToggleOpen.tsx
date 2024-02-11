"use client";
import { useToggleOpen } from "@/shared/hooks/useToggleOpen";
import { FC, ReactNode, useRef } from "react";
import { Transition, TransitionStatus } from "react-transition-group";

interface ToggleOpenProps {
  triggerElement: ReactNode;
  children: ReactNode;
}

const ToggleOpen: FC<ToggleOpenProps> = ({ triggerElement, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { opened, toggleOpened, styles } = useToggleOpen(ref, children);

  return (
    <Transition in={opened} timeout={150}>
      {(state: TransitionStatus) => (
        <div
          className={`relative ${
            state == "entered" ? "overflow-visible" : "overflow-hidden"
          }`}
        >
          <div
            onClick={toggleOpened}
            className="relative cursor-pointer bg-white"
          >
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

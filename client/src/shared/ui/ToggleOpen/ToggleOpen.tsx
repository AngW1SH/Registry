"use client";
import { useToggleOpen } from "@/shared/hooks";
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
  const ref = useRef<HTMLDivElement>(null);

  const { opened, toggleOpened, styles } = useToggleOpen(ref);

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

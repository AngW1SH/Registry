"use client";
import { FC, ReactNode } from "react";
import { Transition, TransitionStatus } from "react-transition-group";

interface ModalProps {
  show: boolean;
  children: ReactNode;
  timeout?: number;
  onConfirm?: () => any;
  onClose?: () => any;
}

const Modal: FC<ModalProps> = ({ show, children, timeout = 100, onClose }) => {
  const defaultStyle = {
    transition: `opacity ${timeout}ms`,
    opacity: 0,
    visibility: "hidden",
  };

  const transitionStyles = {
    entering: { opacity: 1, visibility: "visible" },
    entered: { opacity: 1, visibility: "visible" },
    exiting: { opacity: 0, visibility: "visible" },
    exited: { opacity: 0, visibility: "hidden" },
    unmounted: { opacity: 0, visibility: "hidden" },
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target == e.currentTarget && onClose) onClose();
  };

  return (
    <Transition in={show} timeout={timeout}>
      {(state: TransitionStatus) => (
        <div
          className="fixed left-0 top-0 h-screen w-screen bg-[#00000022]"
          onClick={handleClickOutside}
          style={{
            ...(defaultStyle as any),
            ...(transitionStyles[state] as any), // typescript keeps saying that the visibility is set wrong
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};

export default Modal;

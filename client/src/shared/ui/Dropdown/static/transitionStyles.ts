export const defaultStyle = {
  transition: `all ${100}ms cubic-bezier(0.4, 0, 0.2, 1)`,
  opacity: 0,
  visibility: "hidden",
};

export const transitionStyles = {
  entering: { opacity: 1, visibility: "visible" as "visible" | "hidden" },
  entered: { opacity: 1, visibility: "visible" as "visible" | "hidden" },
  exiting: { opacity: 0, visibility: "visible" as "visible" | "hidden" },
  exited: { opacity: 0, visibility: "hidden" as "visible" | "hidden" },
  unmounted: { opacity: 0, visibility: "hidden" as "visible" | "hidden" },
};

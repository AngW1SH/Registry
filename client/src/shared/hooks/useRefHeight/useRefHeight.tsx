"use client";
import { useEffect, useState } from "react";

export const useRefHeight = (
  ref: React.RefObject<HTMLElement>,
  initialHeight = 0,
) => {
  const [height, setHeight] = useState(initialHeight);
  useEffect(() => {
    const updateFiltersHeight = () => {
      if (ref.current) {
        setHeight(ref.current.clientHeight);
      }
    };

    window.addEventListener("resize", updateFiltersHeight);

    return () => window.removeEventListener("resize", updateFiltersHeight);
  }, [ref.current]);

  return height;
};

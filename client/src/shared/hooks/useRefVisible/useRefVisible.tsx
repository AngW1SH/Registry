"use client";
import { useEffect, useMemo, useState } from "react";

export const useRefVisible = (
  ref: React.RefObject<HTMLElement>,
  threshold: number,
) => {
  const [refVisible, setRefVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setRefVisible(entry.isIntersecting),
      {
        threshold,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref.current]);

  return refVisible;
};

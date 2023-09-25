"use client";
import { useEffect, useMemo, useState } from "react";

export const useRefVisible = (
  ref: React.RefObject<HTMLElement>,
  threshold: number,
) => {
  const [refVisible, setRefVisible] = useState(true);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => setRefVisible(entry.isIntersecting),
        {
          threshold,
        },
      ),
    [ref],
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref.current]);

  return refVisible;
};

"use client";
import { useEffect } from "react";

export const useNextPageCallback = (
  ref: React.RefObject<HTMLElement>,
  callback: IntersectionObserverCallback,
) => {
  const options = {
    rootMargin: "0px 0px 200px 0px",
    threshold: 1,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref.current]);
};

"use client";
import { useRefVisible, useScrollDirection } from "@/shared/hooks";
import { useMemo } from "react";

export const useFixedFilters = (
  ref: React.RefObject<HTMLElement>,
  threshold = 0.48,
) => {
  const scrollDirection = useScrollDirection();

  const isRefVisible = useRefVisible(ref, threshold);

  const shouldRender = useMemo(
    () => scrollDirection === "up" && !isRefVisible,
    [scrollDirection, isRefVisible],
  );

  return { isRefVisible, scrollDirection, shouldRender };
};

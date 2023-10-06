"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getFiltersByParams } from "../utils/getFiltersByParams";
import { serializeFilterParams } from "../utils/serializeParams";

export const useFilters = (searchParams?: {
  [key: string]: string | string[] | undefined;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState(getFiltersByParams(searchParams));

  useEffect(() => {
    router.push(`${pathname}${serializeFilterParams(filters)}`, {
      scroll: false,
    });
  }, [filters]);

  return [filters, setFilters] as const;
};

"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useQueryParams = <T extends Record<string, string>>(
  initialState: T = {} as T,
) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const queryParams = useMemo(() => {
    const params = { ...initialState } as Record<string, string>;
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams, initialState]);

  const updateQueryParams = useCallback(
    (params: Record<string, string | null | undefined>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (!value) {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const resetQueryParams = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return {
    queryParams,
    updateQueryParams,
    resetQueryParams,
  };
};

"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { TOptions } from "i18next";

export function useClientTranslation(ns = "common") {
  const { t, ready } = useTranslation(ns);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const translate = (key: string, options?: TOptions) => {
    if (!isMounted || !ready) return "";
    return t(key, options);
  };

  return { t: translate, isMounted };
}

"use client";

import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/shared/i18n/i18n";
import { Provider } from "react-redux";
import { store } from "@/shared/store/store";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>{children}</Provider>
    </I18nextProvider>
  );
}

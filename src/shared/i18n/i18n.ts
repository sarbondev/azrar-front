import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const isServer = typeof window === "undefined";

if (!i18n.isInitialized && !isServer) {
  const LanguageDetector =
    require("i18next-browser-languagedetector").default;
  const Backend = require("i18next-http-backend").default;

  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "uz",
      supportedLngs: ["uz", "ru"],
      nonExplicitSupportedLngs: true,
      defaultNS: "common",
      ns: ["common"],
      load: "languageOnly",
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
    });
} else if (!i18n.isInitialized && isServer) {
  i18n.use(initReactI18next).init({
    fallbackLng: "uz",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {},
  });
}

export default i18n;

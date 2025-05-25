// src/i18n/config.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enUK from "./locales/en-UK.json";
import enUS from "./locales/en-US.json";
import enCA from "./locales/en-CA.json";
import enAU from "./locales/en-AU.json";
import enNZ from "./locales/en-NZ.json";

const resources = {
  "en-UK": { translation: enUK },
  "en-US": { translation: enUS },
  "en-CA": { translation: enCA },
  "en-AU": { translation: enAU },
  "en-NZ": { translation: enNZ },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en-UK",
    debug: process.env.NODE_ENV === "development",

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;

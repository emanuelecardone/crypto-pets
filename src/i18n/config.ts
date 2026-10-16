import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationIT from "./locales/it.json";
import translationEN from "./locales/en.json";

const resources = {
  it: { translation: translationIT },
  en: { translation: translationEN },
};

i18n.use(initReactI18next).init({
  resources,
  lng: navigator.language.slice(0, 2),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "./constants/languages";
import en from "./locales/en.json";

const _detectedLang =
  localStorage.getItem("languagePreference") ||
  navigator.language.split("-")[0] ||
  "en";

// i18next hardcodes a Locize promotional message via console.info during init.
// Suppress it by temporarily replacing console.info for the synchronous init call.
const _consoleInfo = console.info.bind(console);
console.info = () => {};
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
console.info = _consoleInfo;

export function isSupportedLanguage(lang: string): boolean {
  return SUPPORTED_LANGUAGES.some((l) => l.code === lang);
}

export async function loadLanguage(lang: string): Promise<void> {
  if (lang !== "en" && !i18n.hasResourceBundle(lang, "translation")) {
    if (!isSupportedLanguage(lang)) {
      // Unknown locale — skip the import attempt and leave the fallbackLng in
      // place. Avoids a noisy chunk-load rejection for codes we don't ship.
      return;
    }
    try {
      const messages = await import(`./locales/${lang}.json`);
      i18n.addResourceBundle(lang, "translation", messages.default);
    } catch {
      // Defensive: if the chunk fails to load for any other reason, fall back
      // to English rather than rejecting and blocking the app boot.
      return;
    }
  }
  i18n.changeLanguage(lang);
}

export default i18n;

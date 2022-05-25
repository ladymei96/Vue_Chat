import en from "./lang/en_US.js";
import zh from "./lang/zh_TW.js";

const i18n = {
  legacy: false,
  locale: "zh-TW",
  fallbackLocale: "zh-TW",
  messages: {
    "zh-TW": zh,
    "en-US": en,
  },
};

export function setI18nLanguage(lang) {
  localStorage.setItem("lang", lang);
}

export default i18n;

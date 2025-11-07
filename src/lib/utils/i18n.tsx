import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: "Login",
      enterName: "Enter Your Name",
      button: "LOGIN",
      language: "Language",
      mode: "Mode",
      light: "Light",
      dark: "Dark",
      exit: "Exit",
      twoWeeks: "2 weeks Forecast",
      avgMonthlyTemp: "Average Monthly Temperature",
      loading: "Loading...",
      high: "high",
      low: "low",
      feelsLike: "Feels Like",
      Clouds: "Clouds",
      today: "today"
    },
  },
  fa: {
    translation: {
      login: "ورود",
      enterName: "نام خود را وارد کنید",
      button: "ورود",
      language: "زبان",
      mode: "حالت نمایش",
      light: "روشن",
      dark: "تاریک",
      exit: "خروج",
      twoWeeks: "پیش‌بینی دو هفته‌ای",
      avgMonthlyTemp: "میانگین دمای ماهانه",
      loading: "در حال بارگذاری...",
      high: "بیشینه",
      low: "کمینه",
      feelsLike: "درجه احساس میشود",
      Clouds: "ابری",
      today: "امروز"
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/assets/locales/{{ns}}/{{lng}}.json',
    },
    fallbackLng: 'en',
    debug: false,
    ns: ['about', 'carrers', 'categories', 'contacts', 'home', 'legalinfo', 'network', 'notfound', 'order', 'partnership', 'product', 'products', 'settings', 'tradein'],
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      useSuspense: true,
    },
  });

  export default i18n;
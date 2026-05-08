import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './i18n/locales/en';
import arTranslation from './i18n/locales/ar';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: enTranslation,
      ar: arTranslation
    },
    lng: localStorage.getItem('lng') || 'en',
    fallbackLng: 'en',
    ns:['navbar','auth'],
    defaultNS: 'navbar',
    interpolation: {
      escapeValue: false
    }
  });

// Set initial direction
document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = i18n.language;

export default i18n;

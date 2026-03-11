import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav_home: "Home",
      nav_listings: "Properties",
      nav_valuation: "AI Valuation",
      nav_login: "Login",
      nav_logout: "Logout",
      nav_dashboard: "Dashboard"
    }
  },
  rw: {
    translation: {
      nav_home: "Ahabanza",
      nav_listings: "Imitungo",
      nav_valuation: "Igereranya AI",
      nav_login: "Injira",
      nav_logout: "Sohoka",
      nav_dashboard: "Ibiherereye"
    }
  },
  fr: {
    translation: {
      nav_home: "Accueil",
      nav_listings: "Propriétés",
      nav_valuation: "Évaluation IA",
      nav_login: "Connexion",
      nav_logout: "Déconnexion",
      nav_dashboard: "Tableau de bord"
    }
  }
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
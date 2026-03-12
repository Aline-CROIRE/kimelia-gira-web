import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: { translation: { nav_home: "Home", nav_listings: "Properties", nav_valuation: "AI Valuation", nav_login: "Injira", stats_properties: "Properties", stats_agents: "Verified Agents", stats_locations: "Locations" } },
  rw: { translation: { nav_home: "Ahabanza", nav_listings: "Imitungo", nav_valuation: "Igereranya AI", nav_login: "Injira", stats_properties: "Imitungo", stats_agents: "Abakozi", stats_locations: "Aho dukorera" } },
  fr: { translation: { nav_home: "Accueil", nav_listings: "Propriétés", nav_valuation: "Évaluation IA", nav_login: "Connexion", stats_properties: "Propriétés", stats_agents: "Agents", stats_locations: "Lieux" } }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: { order: ['cookie', 'localStorage', 'navigator'], caches: ['cookie'] },
    interpolation: { escapeValue: false }
  });

export default i18n;
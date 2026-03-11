import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: "Find Your Dream Home",
      search: "Search Properties",
      login: "Login",
      register: "Register",
      valuation: "AI Valuation",
      home: "Home"
    }
  },
  rw: {
    translation: {
      welcome: "Shaka Inzu Yahoze Mu Nzozi Zawe",
      search: "Shaka Umutungo",
      login: "Injira",
      register: "Kwiyandikisha",
      valuation: "Igereranya rya AI",
      home: "Ahabanza"
    }
  },
  fr: {
    translation: {
      welcome: "Trouvez la Maison de Vos Rêves",
      search: "Rechercher des Propriétés",
      login: "Connexion",
      register: "S'inscrire",
      valuation: "Évaluation IA",
      home: "Accueil"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
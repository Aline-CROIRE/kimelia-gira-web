import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      nav_home: "Home",
      nav_listings: "Properties",
      nav_valuation: "AI Valuation",
      nav_login: "Login",
      nav_register: "Register",
      nav_dashboard: "Dashboard",
      nav_logout: "Logout",

      // Hero Section
      hero_badge: "Exclusive Rwanda Real Estate",
      hero_title_1: "Find Your",
      hero_title_premium: "Premium",
      hero_title_2: "Sanctuary In Rwanda",
      hero_subtitle: "AI-verified elite real estate listings for the discerning investor.",
      search_location: "Neighborhood (e.g. Nyarutarama)",
      search_type: "Property Type",
      search_btn: "Search",

      // Trust Bar
      stats_properties: "Verified Listings",
      stats_agents: "Elite Brokers",
      stats_locations: "Kigali Sectors",

      // Auth Pages
      auth_welcome_back: "Welcome Back",
      auth_subtitle_login: "Enter your credentials to access elite listings.",
      auth_subtitle_reg: "Join the elite network of property owners & buyers.",
      auth_google: "Continue with Google",
      auth_email: "Email Address",
      auth_password: "Password",
      auth_name: "Full Name",
      auth_role: "Choose Your Path",
      auth_no_account: "New to Kimelia Gira?",
      auth_have_account: "Already a member?",
      auth_role_buyer: "Buyer",
      auth_role_owner: "Owner",
      auth_role_broker: "Broker",

      // Property Details & Cards
      prop_verified: "Verified Luxury",
      prop_beds: "Beds",
      prop_baths: "Baths",
      prop_area: "m² Area",
      prop_inquiry: "Send Inquiry",
      prop_call: "Call Broker",
      prop_ai_inspect: "AI INSPECTED",
      prop_ai_desc: "Verified for market value and legal authenticity.",
      
      // AI Valuation
      val_title: "AI Property Valuation",
      val_subtitle: "Get an instant market estimate powered by Kimelia AI.",
      val_btn: "Calculate Estimate",
      val_result: "Estimated Market Value",
      val_confidence: "AI Confidence Score",

      list_title: "List Your Property",
list_subtitle: "Submit your asset to our elite AI-verified catalog.",
list_basic_info: "Basic Information",
list_prop_title: "Listing Title",
list_desc: "Description (Enter in any language, AI will translate)",
list_price: "Price (RWF)",
list_location: "Address / Location",
list_features: "Property Features",
list_images: "Property Images",
list_upload_btn: "Upload High-Res Photos",
list_submit: "Publish Listing",
list_title: "List Your Asset",
list_subtitle: "Submit your property to our AI-verified elite catalog.",
list_basic: "Asset Details",
list_name: "Property Title",
list_price: "Price (RWF)",
list_location: "Address (District, Sector)",
list_desc: "Description (Enter in any language)",
list_upload: "Upload High-Resolution Photos",
list_publish: "Publish to Marketplace",
list_processing: "AI is translating & optimizing...",

    }
  },
  rw: {
    translation: {
      nav_home: "Ahabanza",
      nav_listings: "Imitungo",
      nav_valuation: "Igereranya AI",
      nav_login: "Injira",
      nav_register: "Kwiyandikisha",
      nav_dashboard: "Ibiherereye",
      nav_logout: "Sohoka",

      hero_badge: "Imitungo Itimukanwa mu Rwanda",
      hero_title_1: "Vumbura Inzu",
      hero_title_premium: "y'Agatangaza",
      hero_title_2: "Wahoze Unzozi",
      hero_subtitle: "Urubuga rugezweho rwifashisha AI mu gushaka imitungo myiza mu Rwanda.",
      search_location: "Aho iherereye (urugero: Nyarutarama)",
      search_type: "Ubwoko",
      search_btn: "Shaka",

      stats_properties: "Imitungo Yanditswe",
      stats_agents: "Abakozi b'Abizerwa",
      stats_locations: "Uduce dukoreramo",

      auth_welcome_back: "Murakaza Neza",
      auth_subtitle_login: "Injira urebe imitungo yacu yatoranyijwe.",
      auth_subtitle_reg: "Iyongere mu muryango w'abashoramari b'elite.",
      auth_google: "Koresha Google",
      auth_email: "Imeli",
      auth_password: "Ijambo ry'ibanga",
      auth_name: "Amazina Yombi",
      auth_role: "Ndi Umukoresha ki?",
      auth_no_account: "Ntabwo ufite konti?",
      auth_have_account: "Ufite konti?",
      auth_role_buyer: "Ushaka Kugura",
      auth_role_owner: "Nyir'umutungo",
      auth_role_broker: "Umu-Broker",

      prop_verified: "Imitungo y'Agaciro",
      prop_beds: "Ibyumba",
      prop_baths: "Ubuhiragiye",
      prop_area: "m² Ingano",
      prop_inquiry: "Baza amakuru",
      prop_call: "Hamagara",
      prop_ai_inspect: "YASUZUMWE NA AI",
      prop_ai_desc: "Imeze neza kandi agaciro kanyaryo kashyizweho na AI.",
      
      val_title: "Igereranya rya AI",
      val_subtitle: "Bona agaciro k'inzu yawe ako kanya ukoresheje AI.",
      val_btn: "Gereranya Agaciro",
      val_result: "Agaciro kagereranyijwe",
      val_confidence: "Icyizere cya AI"
    }
  },
  fr: {
    translation: {
      nav_home: "Accueil",
      nav_listings: "Propriétés",
      nav_valuation: "Évaluation IA",
      nav_login: "Connexion",
      nav_register: "S'inscrire",
      nav_dashboard: "Tableau de bord",
      nav_logout: "Déconnexion",

      hero_badge: "Immobilier exclusif au Rwanda",
      hero_title_1: "Trouvez Votre",
      hero_title_premium: "Sanctuaire",
      hero_title_2: "Privilégié au Rwanda",
      hero_subtitle: "Annonces d'élite vérifiées par l'IA pour l'investisseur averti.",
      search_location: "Quartier (ex: Nyarutarama)",
      search_type: "Type de propriété",
      search_btn: "Chercher",

      stats_properties: "Annonces Vérifiées",
      stats_agents: "Courtiers d'Élite",
      stats_locations: "Secteurs de Kigali",

      auth_welcome_back: "Bon retour",
      auth_subtitle_login: "Entrez vos identifiants pour accéder aux annonces.",
      auth_subtitle_reg: "Rejoignez le réseau d'élite des propriétaires et acheteurs.",
      auth_google: "Continuer avec Google",
      auth_email: "Adresse e-mail",
      auth_password: "Mot de passe",
      auth_name: "Nom Complet",
      auth_role: "Choisissez Votre Rôle",
      auth_no_account: "Nouveau sur Kimelia Gira ?",
      auth_have_account: "Déjà membre ?",
      auth_role_buyer: "Acheteur",
      auth_role_owner: "Propriétaire",
      auth_role_broker: "Courtier",

      prop_verified: "Luxe Vérifié",
      prop_beds: "Chambres",
      prop_baths: "Bains",
      prop_area: "m² Surface",
      prop_inquiry: "Envoyer Demande",
      prop_call: "Appeler l'agent",
      prop_ai_inspect: "INSPECTÉ PAR L'IA",
      prop_ai_desc: "Vérifié pour la valeur marchande et l'authenticité légale.",

      val_title: "Évaluation Immobilière IA",
      val_subtitle: "Obtenez une estimation instantanée alimentée par Kimelia AI.",
      val_btn: "Calculer l'estimation",
      val_result: "Valeur Marchande Estimée",
      val_confidence: "Score de Confiance IA"
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
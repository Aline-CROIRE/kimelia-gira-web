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
      nav_logout: "Logout",
      nav_dashboard: "Dashboard",
      nav_register: "Register",

      // Hero Section
      hero_title_1: "Discover Your",
      hero_title_premium: "Premium",
      hero_title_2: "Sanctuary",
      hero_subtitle: "The most advanced AI-driven platform for elite real estate investments in Rwanda.",
      search_location: "Location (e.g. Nyarutarama)",
      search_type: "Property Type (e.g. Villa)",
      search_btn: "Search",

      // Trust Bar
      stats_properties: "Listed Properties",
      stats_agents: "Verified Elite Agents",
      stats_locations: "Locations in Rwanda",

      // AI Valuation Page
      val_title: "AI Property Valuation",
      val_subtitle: "Get an instant market estimate powered by Kimelia AI.",
      val_type: "Property Type",
      val_size: "Size (sqm)",
      val_rooms: "Bedrooms",
      val_bathrooms: "Bathrooms",
      val_location: "Location Type",
      val_prime: "Prime (City Center)",
      val_urban: "Urban / Developed",
      val_rural: "Rural / Outskirts",
      val_condition: "Property Condition",
      val_cond_new: "Brand New",
      val_cond_good: "Good / Well Maintained",
      val_cond_old: "Needs Renovation",
      val_btn: "Calculate Estimate",
      val_result: "Estimated Market Value",
      val_confidence: "AI Confidence Score",
      val_analyzing: "AI is analyzing data...",

      // Authentication
      auth_welcome_back: "Welcome Back",
      auth_create_account: "Create an Account",
      auth_email: "Email Address",
      auth_password: "Password",
      auth_name: "Full Name",
      auth_role: "I am a...",
      auth_buyer: "Buyer / Renter",
      auth_owner: "Property Owner",
      auth_google: "Continue with Google",
      auth_no_account: "Don't have an account?",
      auth_have_account: "Already have an account?",
      auth_forgot: "Forgot Password?",

      // Properties
      prop_featured: "Featured",
      prop_properties: "Properties",
      prop_view_details: "View Details",
      prop_price: "Price",
      prop_sqm: "sqm",
      prop_bed: "Bed",
      prop_bath: "Bath",
      prop_loading: "Loading exclusive listings...",
      prop_no_found: "No properties found matching your criteria."
    }
  },
  rw: {
    translation: {
      // Navigation
      nav_home: "Ahabanza",
      nav_listings: "Imitungo",
      nav_valuation: "Igereranya AI",
      nav_login: "Injira",
      nav_logout: "Sohoka",
      nav_dashboard: "Ibiherereye",
      nav_register: "Kwiyandikisha",

      // Hero Section
      hero_title_1: "Vumbura",
      hero_title_premium: "Inzu y'Agatangaza",
      hero_title_2: "Wahoze Unzozi",
      hero_subtitle: "Urubuga rugezweho rwifashisha AI mu gushaka imitungo itimukanwa mu Rwanda.",
      search_location: "Aho iherereye (urugero: Nyarutarama)",
      search_type: "Ubwoko (urugero: Villa)",
      search_btn: "Shaka",

      // Trust Bar
      stats_properties: "Imitungo yanditswe",
      stats_agents: "Abakozi b'abizerwa",
      stats_locations: "Aho dukorera mu Rwanda",

      // AI Valuation Page
      val_title: "Igereranya rya AI",
      val_subtitle: "Bona agaciro k'inzu yawe ako kanya ukoresheje Kimelia AI.",
      val_type: "Ubwoko bw'inzu",
      val_size: "Ingano (m²)",
      val_rooms: "Ibyumba",
      val_bathrooms: "Ubuhiragiye",
      val_location: "Aho iherereye",
      val_prime: "Mu mugi hagati",
      val_urban: "Mu mugi / Hatezimbere",
      val_rural: "Icyaro",
      val_condition: "Imiterere y'inzu",
      val_cond_new: "Inshya rwose",
      val_cond_good: "Imeze neza",
      val_cond_old: "Ikeneye gusanwa",
      val_btn: "Gereranya Agaciro",
      val_result: "Agaciro kagereranyijwe",
      val_confidence: "Icyizere cya AI",
      val_analyzing: "AI iri gusuzuma amakuru...",

      // Authentication
      auth_welcome_back: "Murakaza neza",
      auth_create_account: "Fungura konti",
      auth_email: "Imeli",
      auth_password: "Ijambo ry'ibanga",
      auth_name: "Amazina yombi",
      auth_role: "Ndi...",
      auth_buyer: "Ushaka kugura/Gukodesha",
      auth_owner: "Nyiri umutungo",
      auth_google: "Koresha Google",
      auth_no_account: "Ntabwo ufite konti?",
      auth_have_account: "Ufite konti?",
      auth_forgot: "Wibagiwe ijambo ry'ibanga?",

      // Properties
      prop_featured: "Imitungo",
      prop_properties: "Yatoranyijwe",
      prop_view_details: "Reba birambuye",
      prop_price: "Igiciro",
      prop_sqm: "m²",
      prop_bed: "Icyumba",
      prop_bath: "Ubuhiragiye",
      prop_loading: "Turi gushaka imitungo myiza...",
      prop_no_found: "Nta mitungo yabonetse ijyanye n'ibyo ushaka."
    }
  },
  fr: {
    translation: {
      // Navigation
      nav_home: "Accueil",
      nav_listings: "Propriétés",
      nav_valuation: "Évaluation IA",
      nav_login: "Connexion",
      nav_logout: "Déconnexion",
      nav_dashboard: "Tableau de bord",
      nav_register: "S'inscrire",

      // Hero Section
      hero_title_1: "Découvrez Votre",
      hero_title_premium: "Sanctuaire",
      hero_title_2: "Privilégié",
      hero_subtitle: "La plateforme la plus avancée pilotée par l'IA pour les investissements immobiliers d'élite au Rwanda.",
      search_location: "Emplacement (ex: Nyarutarama)",
      search_type: "Type de propriété (ex: Villa)",
      search_btn: "Rechercher",

      // Trust Bar
      stats_properties: "Propriétés répertoriées",
      stats_agents: "Agents d'élite vérifiés",
      stats_locations: "Lieux à travers le Rwanda",

      // AI Valuation Page
      val_title: "Évaluation Immobilière IA",
      val_subtitle: "Obtenez une estimation instantanée alimentée par Kimelia AI.",
      val_type: "Type de Propriété",
      val_size: "Surface (m²)",
      val_rooms: "Chambres",
      val_bathrooms: "Salles de bain",
      val_location: "Type d'emplacement",
      val_prime: "Centre-ville / Prime",
      val_urban: "Urbain / Développé",
      val_rural: "Rural / Périphérie",
      val_condition: "État de la propriété",
      val_cond_new: "Neuf",
      val_cond_good: "Bon état / Bien entretenu",
      val_cond_old: "Nécessite des travaux",
      val_btn: "Calculer l'estimation",
      val_result: "Valeur Marchande Estimée",
      val_confidence: "Score de Confiance IA",
      val_analyzing: "L'IA analyse les données...",

      // Authentication
      auth_welcome_back: "Bon retour",
      auth_create_account: "Créer un compte",
      auth_email: "Adresse e-mail",
      auth_password: "Mot de passe",
      auth_name: "Nom complet",
      auth_role: "Je suis...",
      auth_buyer: "Acheteur / Locataire",
      auth_owner: "Propriétaire",
      auth_google: "Continuer avec Google",
      auth_no_account: "Pas de compte ?",
      auth_have_account: "Déjà un compte ?",
      auth_forgot: "Mot de passe oublié ?",

      // Properties
      prop_featured: "Propriétés",
      prop_properties: "En vedette",
      prop_view_details: "Voir les détails",
      prop_price: "Prix",
      prop_sqm: "m²",
      prop_bed: "Chambre",
      prop_bath: "Bain",
      prop_loading: "Chargement des annonces exclusives...",
      prop_no_found: "Aucune propriété ne correspond à vos critères."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
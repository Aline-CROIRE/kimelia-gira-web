import API from './api';

const dummyEliteProperties = [
  {
    _id: "d1", propertyType: "house", type: "sale",
    title: { en: "The Obsidian Sapphire Villa", rw: "Villa y'Agatangaza", fr: "La Villa Saphir" },
    description: { 
        en: "A masterpiece of modern architecture located in the heart of Nyarutarama. This villa features floor-to-ceiling glass walls, a private infinity pool, and smart-home integration controlled by AI.",
        rw: "Inzu y'igitangaza iherereye i Nyarutarama. Ifite pisine, ibirahuri binini, n'ikoranabuhanga rigezweho rya AI rigenzura inzu yose.",
        fr: "Un chef-d'œuvre d'architecture moderne situé au cœur de Nyarutarama. Cette villa dispose de murs en verre, d'une piscine privée et d'une IA intégrée."
    },
    price: 850000000, location: { address: "Nyarutarama, Kigali" },
    features: { bedrooms: 5, bathrooms: 4, size: 450 },
    images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200"
    ]
  },
  {
    _id: "d2", propertyType: "land", type: "sale",
    title: { en: "Waterfront Development Plot", rw: "Ikibanza cy'Inzozi", fr: "Terrain Bord de Lac" },
    description: { en: "5,000 sqm of prime residential land overlooking the Bugesera lake district. Perfect for an eco-luxury resort or a private family estate.", rw: "Metero kare 5,000 z'ubutaka bwiza bwitegeye ikiyaga cya Bugesera.", fr: "5 000 m² de terrain résidentiel surplombant le district lacustre de Bugesera." },
    price: 120000000, location: { address: "Bugesera, Riverside" },
    features: { size: 5000 },
    images: [
        "https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=1200",
        "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=1200"
    ]
  },
  {
    _id: "d3", propertyType: "apartment", type: "rent",
    title: { en: "Horizon Sky Penthouse", rw: "Inzu Hejuru y'Ikirere", fr: "Penthouse Horizon" },
    description: { en: "Luxury living with 360-degree views of Kigali. This penthouse includes a private terrace, personal gym, and 24/7 concierge service.", rw: "Inzu nziza cyane ifite view ya Kigali yose. Ifite aho siporo ikorerwa n'abakozi bakwitaho amasaha 24.", fr: "Vie de luxe avec vue à 360 degrés sur Kigali. Ce penthouse comprend une terrasse privée, une salle de sport et un service de conciergerie." },
    price: 3500000, location: { address: "Kacyiru, Kigali" },
    features: { bedrooms: 3, bathrooms: 3, size: 280 },
    images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200"
    ]
  }
];

// EXPORT 1: Fetch List
export const getProperties = async (filters = {}) => {
    try {
        const { type = '', propertyType = '', search = '' } = filters;
        const res = await API.get(`/properties?type=${type}&propertyType=${propertyType}&search=${search}`);
        const realData = res.data.data;
        return realData.length > 0 ? [...realData, ...dummyEliteProperties] : dummyEliteProperties;
    } catch (err) {
        return dummyEliteProperties;
    }
};

// EXPORT 2: Fetch Single Item
export const getPropertyById = async (id) => {
    // If ID starts with 'd', it's a dummy item
    if (id.startsWith('d')) {
        return dummyEliteProperties.find(p => p._id === id);
    }
    
    try {
        const res = await API.get(`/properties/${id}`);
        return res.data.data;
    } catch (err) {
        // Fallback to dummy if real API fails
        return dummyEliteProperties.find(p => p._id === id);
    }
};
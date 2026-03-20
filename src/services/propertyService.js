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
  }
];

export const getProperties = async (filters = {}) => {
    try {
        const { type = '', propertyType = '', search = '' } = filters;
        const res = await API.get(`/properties?type=${type}&propertyType=${propertyType}&search=${search}`);
        const realData = res.data.data || [];
        return realData.length > 0 ? [...realData, ...dummyEliteProperties] : dummyEliteProperties;
    } catch (err) {
        console.error("List Fetch Error:", err);
        return dummyEliteProperties;
    }
};

export const getPropertyById = async (id) => {
    // 1. Check if it's a dummy ID
    if (id.startsWith('d')) {
        return dummyEliteProperties.find(p => p._id === id);
    }
    
    // 2. Fetch from Real API
    try {
        const res = await API.get(`/properties/${id}`);
        console.log("API Detail Response:", res.data); // LOG FOR DEBUGGING
        
        // Ensure we return the 'data' object inside the response
        return res.data.data || res.data; 
    } catch (err) {
        console.error("Property Detail Fetch failed for ID:", id);
        // Fallback to first dummy if real fetch fails during development
        return null;
    }
};
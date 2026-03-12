import API from './api';

const dummyList = [
  {
    _id: "d1", propertyType: "house", type: "sale",
    title: { en: "The Obsidian Sapphire Villa", rw: "Villa y'Agatangaza", fr: "La Villa Saphir" },
    description: { 
        en: "A masterpiece of modern architecture located in the heart of Nyarutarama. This villa features floor-to-ceiling glass walls, a private infinity pool, and smart-home integration controlled by AI.",
        rw: "Inzu y'igitangaza iherereye i Nyarutarama. Ifite pisine, ibirahuri binini, n'ikoranabuhanga rigezweho rya AI rigenzura inzu yose.",
        fr: "Un chef-d'œuvre d'architecture moderne situé au cœur de Nyarutarama. Cette villa dispose de murs en verre, d'une piscine privée et d'une IA intégrée."
    },
    price: 850000000, location: { address: "Nyarutarama, Kigali", coordinates: [30.1, -1.9] },
    features: { bedrooms: 5, bathrooms: 4, size: 450 },
    images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200"
    ]
  },
  {
    _id: "d2", propertyType: "land", type: "sale",
    title: { en: "Prime Waterfront Bugesera Plot", rw: "Ikibanza cy'Inzozi Bugesera", fr: "Terrain de Prestige à Bugesera" },
    description: { en: "5,000 sqm of prime residential land overlooking the Bugesera lake district. Perfect for an eco-luxury resort or a private family estate.", rw: "Metero kare 5,000 z'ubutaka bwiza bwitegeye ikiyaga cya Bugesera.", fr: "5 000 m² de terrain résidentiel surplombant le district lacustre de Bugesera." },
    price: 120000000, location: { address: "Bugesera, Riverside", coordinates: [30.2, -2.1] },
    features: { size: 5000 },
    images: [
        "https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=1200",
        "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=1200"
    ]
  }
];

export const getProperties = async () => {
    try {
        const res = await API.get('/properties');
        return res.data.data.length > 0 ? [...res.data.data, ...dummyList] : dummyList;
    } catch (err) {
        return dummyList;
    }
};

export const getPropertyById = async (id) => {
    if (id.startsWith('d')) return dummyList.find(p => p._id === id);
    try {
        const res = await API.get(`/properties/${id}`);
        return res.data.data;
    } catch (err) {
        return dummyList.find(p => p._id === id);
    }
};
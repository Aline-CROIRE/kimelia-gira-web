import API from './api';

const dummyEliteProperties = [
  {
    _id: "d1", propertyType: "house", type: "sale",
    title: { en: "The Sapphire Villa", rw: "Villa y'Agatangaza", fr: "La Villa Saphir" },
    price: 850000000, location: { address: "Nyarutarama, Kigali" },
    features: { bedrooms: 5, bathrooms: 4, size: 450 },
    images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811", "https://images.unsplash.com/photo-1613977257363-707ba9348227"]
  },
  {
    _id: "d2", propertyType: "land", type: "sale",
    title: { en: "Waterfront Development Plot", rw: "Ikibanza cy'Inzozi", fr: "Terrain Bord de Lac" },
    price: 120000000, location: { address: "Bugesera, Riverside" },
    features: { size: 2500 },
    images: ["https://images.unsplash.com/photo-1500382017468-9049fee74a62", "https://images.unsplash.com/photo-1500076656116-558758c991c1"]
  },
  {
    _id: "d3", propertyType: "apartment", type: "rent",
    title: { en: "Horizon Sky Penthouse", rw: "Inzu Hejuru y'Ikirere", fr: "Penthouse Horizon" },
    price: 3500000, location: { address: "Kacyiru, Kigali" },
    features: { bedrooms: 3, bathrooms: 3, size: 280 },
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"]
  }
];

export const getProperties = async (filters = {}) => {
    try {
        const { type = '', propertyType = '' } = filters;
        const res = await API.get(`/properties?type=${type}&propertyType=${propertyType}`);
        const realData = res.data.data;
        // Combine real data with dummy data to ensure diversity
        return realData.length > 0 ? [...realData, ...dummyEliteProperties] : dummyEliteProperties;
    } catch (err) {
        return dummyEliteProperties;
    }
};
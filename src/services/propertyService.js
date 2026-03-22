import API from './api';

/**
 * 1. ASSET DISCOVERY
 */
export const getProperties = async (filters = {}) => {
    try {
        const { type = '', propertyType = '', search = '' } = filters;
        const res = await API.get(`/properties?type=${type}&propertyType=${propertyType}&search=${search}`);
        return res.data.data || [];
    } catch (err) {
        console.error("Discovery Engine Error");
        return [];
    }
};

export const getPropertyById = async (id) => {
    if (!id) return null;
    try {
        const res = await API.get(`/properties/${id}`);
        return res.data.data;
    } catch (err) {
        console.error("Asset Detail Fetch Error:", id);
        return null;
    }
};

/**
 * 2. ASSET MANAGEMENT (Owner / Broker Actions)
 */
export const createProperty = async (formData) => {
    return await API.post('/properties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const updateProperty = async (id, data) => {
    return await API.put(`/properties/${id}`, data);
};

export const deleteProperty = async (id) => {
    return await API.delete(`/properties/${id}`);
};

/**
 * 3. LEAD CENTER & CONVERSATIONAL UI
 */
export const getMyInquiries = async () => {
    try {
        // Points to unique inbox route
        const res = await API.get('/interactions/chat/list/all');
        return res.data.data || [];
    } catch (err) {
        console.error("Messenger Sync Error");
        return [];
    }
};

export const createInquiry = async (propertyId, message, phone) => {
    // Points to unique submission route
    return await API.post(`/interactions/chat/submit/${propertyId}`, { message, phone });
};

export const sendReply = async (inquiryId, text) => {
    // Points to unique infinite-chat reply route
    return await API.put(`/interactions/chat/add-message/${inquiryId}`, { text });
};

/**
 * 4. SOCIAL & WATCHLIST
 */
export const toggleFavorite = async (id) => {
    // Points to unique atomic toggle route
    return await API.post(`/interactions/favs/toggle/${id}`);
};

export const getFavorites = async () => {
    try {
        const res = await API.get('/interactions/favs/all');
        return res.data.data || [];
    } catch (err) {
        console.error("Watchlist Fetch Error");
        return [];
    }
};

/**
 * 5. AI VALUATION ENGINE
 */
export const getAIValuation = async (formData) => {
    const res = await API.post('/valuation/estimate', formData);
    return res.data.data;
};
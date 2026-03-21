import API from './api';

export const getProperties = async (filters = {}) => {
    try {
        const { type = '', propertyType = '', search = '' } = filters;
        const res = await API.get(`/properties?type=${type}&propertyType=${propertyType}&search=${search}`);
        return res.data.data || [];
    } catch (err) { return []; }
};

export const getPropertyById = async (id) => {
    try {
        const res = await API.get(`/properties/${id}`);
        return res.data.data;
    } catch (err) { return null; }
};

// --- INTERACTION SYSTEM ---

export const getMyInquiries = async () => {
    try {
        const res = await API.get('/interactions/chat/list/all');
        return res.data.data || [];
    } catch (err) { return []; }
};

export const createInquiry = async (propertyId, message) => {
    // Corrected to match backend
    return await API.post(`/interactions/chat/submit/${propertyId}`, { message });
};

export const sendReply = async (id, text) => {
    return await API.put(`/interactions/chat/reply/${id}`, { text });
};

export const toggleFavorite = async (id) => {
    // Corrected to match backend
    return await API.post(`/interactions/favs/toggle/${id}`);
};
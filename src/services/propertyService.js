import API from './api';



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


export const createInquiry = async (propertyId, message, phone) => {
    return await API.post(`/interactions/send/${propertyId}`, { message, phone });
};





export const toggleFavorite = async (id) => {
    return await API.post(`/interactions/toggle/${id}`);
};

export const getFavorites = async () => {
    try {
        const res = await API.get('/interactions/favorites');
        return res.data.data || [];
    } catch (err) {
        return [];
    }
};

export const getAIValuation = async (formData) => {
    const res = await API.post('/valuation/estimate', formData);
    return res.data.data;
};



export const getProperties = async (filters = {}) => {
    try {
        const res = await API.get('/properties');
        return res.data.data || [];
    } catch (err) { return []; }
};

export const getPropertyById = async (id) => {
    try {
        const res = await API.get(`/properties/${id}`);
        return res.data.data;
    } catch (err) { return null; }
};

export const getMyInquiries = async () => {
    try {
        const res = await API.get('/interactions/inbox');
        return res.data.data || [];
    } catch (err) { return []; }
};

export const sendReply = async (id, text) => {
    return await API.put(`/interactions/reply/${id}`, { text });
};

export const purgeChat = async (id) => {
    return await API.delete(`/interactions/chat/${id}`);
};

export const revokeMessage = async (chatId, msgId) => {
    return await API.delete(`/interactions/chat/${chatId}/message/${msgId}`);
};

export const markAsRead = async (id) => {
    return await API.put(`/interactions/read/${id}`);
};
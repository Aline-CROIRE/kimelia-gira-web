import API from './api';

/**
 * PROPERTY SERVICE
 * Handles all data interactions for Kimelia Gira Assets.
 */

// EXPORT 1: Fetch list with filters
export const getProperties = async (filters = {}) => {
    try {
        const { type = '', propertyType = '', search = '' } = filters;
        const res = await API.get(`/properties?type=${type}&propertyType=${propertyType}&search=${search}`);
        return res.data.data || [];
    } catch (err) {
        console.error("List Fetch Error:", err);
        return [];
    }
};

// EXPORT 2: Fetch single asset
export const getPropertyById = async (id) => {
    try {
        const res = await API.get(`/properties/${id}`);
        return res.data.data;
    } catch (err) {
        console.error("Detail Fetch Error:", err);
        return null;
    }
};

// EXPORT 3: Update existing asset
export const updateProperty = async (id, data) => {
    return await API.put(`/properties/${id}`, data);
};

// EXPORT 4: Remove asset
export const deleteProperty = async (id) => {
    return await API.delete(`/properties/${id}`);
};
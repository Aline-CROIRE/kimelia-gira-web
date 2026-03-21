import axios from 'axios';

const API = axios.create({
    // Updated to point to your local Node.js server
    baseURL: 'http://localhost:5000/api/v1',
});

// Automatically attach JWT token from storage
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
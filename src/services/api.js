import axios from 'axios';

const API = axios.create({
    baseURL: 'https://kimelia-gira-api.onrender.com/api/v1',
});

// Automatically add the JWT token to every request if the user is logged in
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
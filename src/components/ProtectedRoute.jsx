import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // Show nothing while we check if the user is logged in
    if (loading) return null; 

    // If no user is found, redirect to Login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If user exists, show the protected content (e.g., Dashboard)
    return children;
};

export default ProtectedRoute;
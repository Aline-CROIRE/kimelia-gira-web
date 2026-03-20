import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * PROTECTED ROUTE (User Level)
 * Redirects to Login if the user is not authenticated.
 */
export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // Don't redirect while the auth state is still being determined
    if (loading) return null; 

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

/**
 * ADMIN ROUTE (Privileged Level)
 * Only allows users with the 'admin' role. Redirects others to Home.
 */
export const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null;

    if (!user || user.role !== 'admin') {
        // Log unauthorized attempt for security monitoring
        console.warn("Unauthorized access attempt to Admin Console");
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
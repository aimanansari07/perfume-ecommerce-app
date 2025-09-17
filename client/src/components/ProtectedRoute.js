import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode'; // Install this: npm install jwt-decode

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        // Decode the token to check the user's role
        const decoded = jwtDecode(token);
        if (decoded.role !== 'admin') {
            return <Navigate to="/" />; // Redirect non-admins to homepage
        }
    } catch (error) {
        return <Navigate to="/login" />;
    }

    return children;
};
export default ProtectedRoute;
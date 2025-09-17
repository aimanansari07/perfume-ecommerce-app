import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                if (decoded.exp * 1000 > Date.now()) {
                    setToken(storedToken);
                    setUser({ id: decoded.id, role: decoded.role });
                    setIsAuth(true);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = (tokenData, userData) => {
        localStorage.setItem('token', tokenData);
        setToken(tokenData);
        setUser(userData);
        setIsAuth(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, user, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};
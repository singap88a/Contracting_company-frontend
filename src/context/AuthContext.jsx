import React, { createContext, useState, useEffect, useContext } from 'react';
import { API_URL } from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('adminToken'));

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/auth/me`, {
                    headers: {
                        'x-auth-token': token
                    }
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    // Token invalid or expired
                    localStorage.removeItem('adminToken');
                    setToken(null);
                    setUser(null);
                }
            } catch (err) {
                console.error('Auth error:', err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    const login = (newToken, userData) => {
        localStorage.setItem('adminToken', newToken);
        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

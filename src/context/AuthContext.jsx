import React, { createContext, useState, useEffect, useContext } from 'react';
import { API_URL } from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(() => {
        const stored = localStorage.getItem('adminToken');
        return (stored === 'undefined' || stored === 'null' || !stored) ? null : stored;
    });

    useEffect(() => {
        const fetchUser = async () => {
            const storedToken = localStorage.getItem('adminToken');
            if (!storedToken) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/auth/me`, {
                    headers: {
                        'x-auth-token': storedToken
                    }
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else if (response.status === 401 || response.status === 403) {
                    // Token invalid or expired
                    localStorage.removeItem('adminToken');
                    setToken(null);
                    setUser(null);
                }
            } catch (err) {
                console.error('Auth check connection error:', err);
                // On network error, keep the token but we might still be 'unauthenticated' 
                // because we don't have user data. However, we won't wipe the token.
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = (newToken, userData) => {
        localStorage.setItem('adminToken', newToken);
        setToken(newToken);
        if (userData) {
            setUser(userData);
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            token, 
            loading, 
            login, 
            logout, 
            isAuthenticated: !!token 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

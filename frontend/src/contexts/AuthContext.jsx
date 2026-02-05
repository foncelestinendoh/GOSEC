import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('gosec_admin_token');
    if (token) {
      // For simplicity, we just check if token exists
      // In production, you'd verify the token with the server
      setUser({ username: 'admin' });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await authApi.login(username, password);
    const { access_token } = response.data;
    localStorage.setItem('gosec_admin_token', access_token);
    setUser({ username });
    return response;
  };

  const logout = () => {
    localStorage.removeItem('gosec_admin_token');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

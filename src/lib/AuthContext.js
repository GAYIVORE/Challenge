import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { appParams } from '@/lib/app-params';

const AuthContext = createContext();

// Create a base axios instance for your own API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', 
  headers: {
    'X-App-Id': appParams.appId
  }
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      setIsLoadingPublicSettings(true);
      setAuthError(null);

      // 1. Fetch your own app settings or config from your backend
      try {
        const response = await api.get(`/public/settings/${appParams.appId}`);
        setAppPublicSettings(response.data);

        // 2. Check if we have a token to verify the user
        if (appParams.token) {
          await checkUserAuth();
        } else {
          finishLoading();
        }
      } catch (appError) {
        handleError(appError);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setAuthError({ type: 'unknown', message: 'An unexpected error occurred' });
      finishLoading();
    }
  };

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      
      // Use the token from appParams (which looks in URL/LocalStorage)
      const response = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${appParams.token}` }
      });

      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('User auth check failed:', error);
      setIsAuthenticated(false);
      if (error.response?.status === 401) {
        setAuthError({ type: 'auth_required', message: 'Session expired' });
      }
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
      setIsLoadingPublicSettings(false);
    }
  };

  const finishLoading = () => {
    setIsLoadingAuth(false);
    setIsLoadingPublicSettings(false);
    setAuthChecked(true);
  };

  const handleError = (error) => {
    const status = error.response?.status;
    const reason = error.response?.data?.reason;

    if (status === 403 || status === 401) {
      setAuthError({
        type: reason || 'auth_required',
        message: error.response?.data?.message || 'Authentication required'
      });
    } else {
      setAuthError({
        type: 'unknown',
        message: error.message || 'Failed to load app settings'
      });
    }
    finishLoading();
  };

  const logout = () => {
    // Clear local data
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear your storage keys defined in your updated app-params.js
    localStorage.removeItem('app_token');
    localStorage.removeItem('app_access_token');

    // Redirect to home or login
    window.location.href = '/';
  };

  const navigateToLogin = () => {
    // Redirect to your custom login route
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState
    }}>
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
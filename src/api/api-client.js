import axios from 'axios';
import { appParams } from '@/lib/app-params';

const { appId, token, apiUrl } = appParams;

// Create a custom Axios instance
export const api = axios.create({
  baseURL: apiUrl || 'http://localhost:5000', // Falls back to local dev
  headers: {
    'Content-Type': 'application/json',
    'X-App-Id': appId, // If your backend needs to identify the app
  }
});

// Automatically add the token to every request if it exists
api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login or clearing storage...");
      // Optional: localStorage.removeItem('app_token');
    }
    return Promise.reject(error);
  }
);
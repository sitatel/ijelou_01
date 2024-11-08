import axios from 'axios';
import { API_CONFIG } from '../config/api';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'CONVAI-API-KEY': API_CONFIG.API_KEY,
    'Content-Type': 'application/json'
  }
});

// Error interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('API Key invalid or expired');
    }
    return Promise.reject(error);
  }
);

export default api;
import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Set up caching for GET requests
const cachedApi = setupCache(api, {
  ttl: 5 * 60 * 1000,
  methods: ['get'],
});

// Auth interceptor
cachedApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — DO NOT unwrap .data here
// Let each service call handle the response directly
// so CategoryPage.jsx r.data works correctly
cachedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.error || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default cachedApi;
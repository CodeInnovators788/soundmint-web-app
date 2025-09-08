import axios from 'axios';
import { BASE_URL } from '../../constant/config';

// Create a reusable axios instance
const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for requests or responses
client.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default client;

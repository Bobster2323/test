import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://procco-backend.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (username: string, password: string, role: string) => {
  console.log('Sending registration request to:', `${API_URL}/register`);
  return api.post('/register', { username, password, role });
};

export const login = (username: string, password: string) => {
  return api.post('/login', { username, password });
};

export const submitServiceRequest = (requestData: {
  user_id: string;
  title: string;
  description: string;
  category: string;
  budget: string;
  deadline: string;
  location: string;
}) => {
  return api.post('/service-requests', requestData);
};

export default api;
import axios from 'axios';

// const baseURL = 'http://localhost:3333';
const baseURL = 'http://i00k8swwgcwgogs4w80sg088.31.97.18.198.sslip.io/';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@beach-agenda:token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
  }
);

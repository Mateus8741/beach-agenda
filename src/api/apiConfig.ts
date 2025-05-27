import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { tokenKey } from '@/store';

const baseURL = 'http://i00k8swwgcwgogs4w80sg088.31.97.18.198.sslip.io';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const storedData = await AsyncStorage.getItem(tokenKey);

  if (storedData) {
    const { state } = JSON.parse(storedData);
    if (state.token) {
      config.headers.Authorization = `Bearer ${state.token}`;
    }
  }

  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error.response?.data ?? error.message);
//   }
// );

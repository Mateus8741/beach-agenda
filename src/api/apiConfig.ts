import axios from 'axios';

const baseURL = 'http://i00k8swwgcwgogs4w80sg088.31.97.18.198.sslip.io/';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem(tokenKey);

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error.response?.data ?? error.message);
//   }
// );

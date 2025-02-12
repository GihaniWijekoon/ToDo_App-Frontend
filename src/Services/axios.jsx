import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5164/api', // Set the base URL of your backend API
  withCredentials: true,
  timeout: 5000, // Request timeout (optional)
});

// Add a request interceptor to include JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to request headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle error if the token is missing or invalid
  }
);

export default api;
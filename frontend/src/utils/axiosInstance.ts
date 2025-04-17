import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // Adjust baseURL if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ensure the env variable is set
  headers: {
    'Content-Type': 'application/json',
  },
});
export default axiosInstance
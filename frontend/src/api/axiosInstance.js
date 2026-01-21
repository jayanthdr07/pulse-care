import axios from "axios"
import { clearToken, getToken } from "../utils/tokenUtils";



const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, //java backend url
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
  );
 
export default axiosInstance;
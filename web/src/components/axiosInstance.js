import axios from "axios";
import { API_URL } from "../utils/config";

const axiosInstance = axios.create({
  baseURL: API_URL, // Set your base API URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

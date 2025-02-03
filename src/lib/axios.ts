// src/lib/axios.ts
import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // e.g., http://localhost:8000
  withCredentials: true, // Ensures cookies are sent with every request
});

export default axiosInstance;

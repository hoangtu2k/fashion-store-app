// src/api/axiosClient.js
import axios from "axios";

const loginService = axios.create({
  baseURL: "http://localhost:8080", // đổi theo backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token tự động
loginService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default loginService;

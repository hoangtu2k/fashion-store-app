import axios from "./axiosConfig";

const API_BASE = "/auth/";

export const authService = {
  login: (loginData) => {
    return axios.post(`${API_BASE}login`, loginData);
  },
  getUserByToken: (token) => {
    return axios.get(`${API_BASE}get`, { params: { token } });
  },
};

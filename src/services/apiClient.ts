import axios from "axios";
import { EXPENSE_API_BASE_URL } from "../data/constants";
import { getAuthStatus } from "../utils";

export const apiClient = axios.create({
  baseURL: EXPENSE_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthStatus();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

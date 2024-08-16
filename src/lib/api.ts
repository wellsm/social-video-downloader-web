/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER } from "@/app/contexts/auth";
import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

client.interceptors.request.use((config) => {
  const user = localStorage.getItem(USER);

  if (user) {
    config.headers.Authorization = JSON.parse(user).access_token;
  }

  return config;
});

export const http = {
  get: async (url: string, params?: any) => await client.get(url, { params }),
  post: async (url: string, data?: any, config?: any) => await client.post(url, data, config),
  url: (url: string) => `${import.meta.env.VITE_API_BASE_URL.replace(/\/\s*$/, "")}/${url}`
};

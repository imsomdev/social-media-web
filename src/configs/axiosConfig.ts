import axios from "axios";
import { getSession } from "next-auth/react";

// Axios instance for authenticated requests
export const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Axios instance for unauthenticated requests
export const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosApi.interceptors.request.use(
  async (config) => {
    const session: any = await getSession();
    if (session?.jwt) {
      config.headers.Authorization = `Bearer ${session.jwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

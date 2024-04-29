import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");

export const api = axios.create({
  baseURL:
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_BACKEND_URL
      : "/api",
  headers: {
    Authorization: token && `Bearer ${token}`,
  },
});

api.interceptors.request.use((config) => {
  const currentToken = Cookies.get("accessToken");
  if (currentToken) config.headers.Authorization = `Bearer ${currentToken}`;
  return config;
});

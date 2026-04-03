import axios from "axios";

import { logout } from "../redux/features/auth/AuthSlice";
import { getStore } from "../redux/store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_ROUTES from "../redux/endPoints/ApiRoutes";
import { TokenService } from "../units/TokenServices";

const BASE_URL = "http://157.180.30.0:4000";

const api = axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

const silentReLogin = async () => {
  try {
    const raw = await AsyncStorage.getItem('user_credentials');
    if (!raw) {
      return null;
    }
    const credentials = JSON.parse(raw);
    const response = await axios.post(`${BASE_URL}${API_ROUTES.LOGIN_AUTH}`, credentials);
    const newToken = response?.data?.accessToken || response?.data?.access_token;

    if (newToken) {
      await TokenService.setTokens(newToken, null);
      return newToken;
    }

    return null;
  } catch (error) {
    return null;
  }
};

api.interceptors.request.use(async (config) => {
  const url = config.url || '';

  const skipAuth =
    url.includes(API_ROUTES.LOGIN_AUTH) ||
    url.includes(API_ROUTES.REGISTER_AUTH);

  if (!skipAuth) {
    const token = await TokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      const newToken = await silentReLogin();

      if (newToken) {
        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        isRefreshing = false;
        return api(originalRequest);
      }
      processQueue(null, null);
      isRefreshing = false;
      await TokenService.clearTokens();
      getStore().dispatch(logout());
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
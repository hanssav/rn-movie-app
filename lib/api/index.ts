import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const account_id = 22381243;

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_TMDB_API,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
  },
});

// ==== EXAMPLE USE TOKEN FRON STORAGE EVERY REQUEST ====

// npx expo install expo-secure-store
// import * as SecureStore from 'expo-secure-store';

// apiInstance.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     try {
//       const token = await SecureStore.getItemAsync('token');

//       if (token) {
//         config.headers.set('Authorization', `Bearer ${token}`);
//       }
//     } catch (error) {
//       console.error('Error retrieving token:', error);
//     }

//     return config;
//   }
// );

export const apiService = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await api.get<T>(url, config);
    return res.data;
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await api.post<T>(url, data, config);
    return res.data;
  },

  patch: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await api.patch<T>(url, data, config);
    return res.data;
  },

  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await api.put<T>(url, data, config);
    return res.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await api.delete<T>(url, config);
    return res.data;
  },
};

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<{ message?: string }>;
    return ax.response?.data?.message ?? err.message;
  }
  return (err as { message?: string })?.message ?? 'Unknown error';
}

export function isAuthError(err: unknown): boolean {
  return axios.isAxiosError(err) && err.response?.status === 401;
}

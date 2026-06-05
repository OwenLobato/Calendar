import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const calendarApi: AxiosInstance = axios.create({
  baseURL: VITE_API_URL + '/api',
});

calendarApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers['x-token'] = localStorage.getItem('token') ?? '';

  return config;
});

export default calendarApi;

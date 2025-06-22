import axios, { AxiosError, AxiosInstance } from 'axios';
import HttpStatusCode from '@/constants/http-status-enum';
import { toast } from 'react-toastify';
import { getAccessTokenFromLS, removeLocalStorage, setAccessTokenToLS, setProfileToLS } from './auth';
import path from '../constants/path';
import { config } from '@/constants/config';

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.instance.interceptors.request.use((config) => {
      // this.accessToken = getAccessTokenFromLS(); // lấy lại token từ localStorage
      if (this.accessToken && config.headers) {
        config.headers.Authorization = this.accessToken;
        return config;
      }
      return config;
    });
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === path.login.slice(1) || url === path.register.slice(1)) {
          this.accessToken = response.data.data.access_token;
          setAccessTokenToLS(this.accessToken);
          setProfileToLS(response.data.data.user);
        }
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errorHandle: any | undefined = error.response?.data;
          const message = errorHandle?.message || error.message;
          const toastId = 'authError';
          toast.error(message, { toastId });

          if (error.response?.status === HttpStatusCode.Unauthorized) {
            removeLocalStorage();
          }
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;

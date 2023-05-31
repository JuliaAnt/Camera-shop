import axios, { AxiosInstance } from 'axios';

// import { StatusCodes } from 'http-status-codes';
// import { toast } from 'react-toastify';
// import { getToken } from './token';

// const StatusCodeMapping: Record<number, boolean> = {
//   [StatusCodes.BAD_REQUEST]: true,
//   [StatusCodes.UNAUTHORIZED]: true,
//   [StatusCodes.NOT_FOUND]: true
// };

// const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BASE_URL = 'https://camera-shop.accelerator.pages.academy/';
const TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  // api.interceptors.request.use(
  //   (config: AxiosRequestConfig) => {
  //     const token = getToken();

  //     if (token && config.headers) {
  //       config.headers['X-Token'] = token;
  //     }

  //     return config;
  //   }
  // );

  // api.interceptors.response.use(
  //   (response) => response,
  //   (error: AxiosError<{ message: string }>) => {
  //     if (error.response && shouldDisplayError(error.response)) {
  //       toast.warn(error.response.data.message);
  //     }

  //     throw error;
  //   }
  // );
  return api;
};

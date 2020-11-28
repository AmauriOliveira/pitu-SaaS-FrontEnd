import axios, { AxiosInstance } from 'axios';

const baseApi = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
  });

  return api;
};

export default baseApi;

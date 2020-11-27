import axios from 'axios';

const baseApi = (baseURL: string): any => {
  const api = axios.create({
    baseURL,
  });

  return api;
};

export default baseApi;

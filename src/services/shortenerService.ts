import { AxiosInstance } from 'axios';
import baseApi from './api';

class ShortenerService {
  api: AxiosInstance;

  constructor() {
    this.api = baseApi(process.env.REACT_APP_API as string);
  }

  async getLink(code: string): Promise<any> {
    const result = await this.api.get(`links/${code}`);

    return result.data;
  }

  async getStats(code: string): Promise<any> {
    const result = await this.api.get(`links/${code}/status`);

    return result.data;
  }

  async generate(model: { url: string }): Promise<any> {
    const result = await this.api.post('links/', model);

    return result.data;
  }
}
export default ShortenerService;

import { AxiosInstance } from 'axios';

export class ArkavidiaBaseApi {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }
}

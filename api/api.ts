import axios from 'axios';
import AuthApi from './auth';
import UserApi from '~/api/user';
import SocketApi from "~/api/socket";

const apiClient = axios.create({
  // Prevent sending cookies with cross-domain requests
  withCredentials: false,

  // Django sends the XSRF token in a cookie named csrftoken
  // https://docs.djangoproject.com/en/2.1/ref/csrf/#ajax
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken'
});

export class ArkavidiaApi {
  baseUrl: string;

  auth: AuthApi;
  user: UserApi = new UserApi(apiClient);
  socket: SocketApi;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    apiClient.defaults.baseURL = baseUrl;

    this.auth = new AuthApi(apiClient);
    this.user = new UserApi(apiClient);
    this.socket = new SocketApi(this.baseUrl);
  }

  set bearerToken(bearerToken: string|Function) {
    apiClient.interceptors.request.use((config) => {
      const bearerTokenString = (bearerToken instanceof Function) ? bearerToken() : bearerToken;

      if (bearerTokenString) {
        config.headers.common.Authorization = `Bearer ${bearerTokenString}`;
      }
      return config;
    });
  }
}

const arkavidiaApi = new ArkavidiaApi(process.env.API_BASE_URL || '');

export default arkavidiaApi;

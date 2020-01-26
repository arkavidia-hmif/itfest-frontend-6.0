import axios from 'axios';
import AuthApi from './auth';
import UserApi from '~/api/user';

const apiClient = axios.create({
  // Prevent sending cookies with cross-domain requests
  withCredentials: false,

  // Django sends the XSRF token in a cookie named csrftoken
  // https://docs.djangoproject.com/en/2.1/ref/csrf/#ajax
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken'
});

export class ArkavidiaApi {
  constructor(baseUrl: string) {
    apiClient.defaults.baseURL = baseUrl;
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

  auth: AuthApi = new AuthApi(apiClient);
  user: UserApi = new UserApi(apiClient);
}

const arkavidiaApi = new ArkavidiaApi(process.env.API_BASE_URL || '');

export default arkavidiaApi;

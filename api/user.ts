import { UserData } from './types';
import { ArkavidiaBaseApi } from './base';

export default class UserApi extends ArkavidiaBaseApi {
  async getProfile(): Promise<UserData> {
    const response = await this.axios.get(`/user/me`);
    return response.data.data;
  }
}

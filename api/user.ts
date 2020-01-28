import { UserData } from './types';
import { ArkavidiaBaseApi } from './base';
import {Transaction} from "~/api/types";

export default class UserApi extends ArkavidiaBaseApi {
  async getProfile(): Promise<UserData> {
    const response = await this.axios.get(`/user/me`);
    return response.data.data;
  }

  async getTransactions(): Promise<Transaction[]> {
    const response = await this.axios.get(`/user/me/transaction`);
    return response.data.data.array;
  }
}

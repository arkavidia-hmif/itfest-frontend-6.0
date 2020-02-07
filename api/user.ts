import {ApiResponse, Qrcode, UserData} from './types';
import {ArkavidiaBaseApi} from './base';
import {Transaction} from "~/api/types";

export default class UserApi extends ArkavidiaBaseApi {
  async getProfile(): Promise<UserData> {
    const response = await this.axios.get(`/user/me`);
    return response.data.data;
  }

  async getUser({id}): Promise<UserData> {
    const response = await this.axios.get(`/user/${id}`);
    return response.data.data;
  }

  async getTransactions(page: number = 1, itemPerPage: number = 20): Promise<Transaction[]> {
    const response = await this.axios.get(`/user/me/transaction?page=${page}&itemPerPage=${itemPerPage}`);
    return response.data.data.array;
  }

  async getQRID(): Promise<Qrcode> {
    const response = await this.axios.get('/user/me/qrid');
    return response.data.data;
  }

  async getAllTenants(): Promise<UserData[]> {
    const response = await this.axios.get('/user/tenant');
    return response.data.data.array;
  }

  async redeemItem({id, itemId, amount}): Promise<ApiResponse<void>> {
    const payload = {
      item: itemId,
      amount: amount
    };

    const response = await this.axios.post(`/user/${id}/redeem`, payload);
    return response.data;
  }

  async updateProfile({name, email, dob, gender, interest}): Promise<void> {
    const payload = {
      name: name,
      email: email,
      dob: dob,
      gender: gender,
      interest: interest
    };
    await this.axios.put('/user/me', payload);
  }

  async transferPoint(recipientQrId: string, amount: number): Promise<void> {
    const payload = { amount };
    await this.axios.post(`/user/${recipientQrId}/give`, payload);
  }
}

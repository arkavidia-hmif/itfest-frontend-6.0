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

  async getTransactions(): Promise<Transaction[]> {
    const response = await this.axios.get(`/user/me/transaction`);
    return response.data.data;
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
      qty: amount
    };
    return await this.axios.post(`/user/${id}/redeem`, payload);
  }
  
  async getVisitorQR(qrId:string): Promise<any>{
    return await this.axios.get(`/user/${qrId}`);
  }
  
}

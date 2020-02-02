import { ArkavidiaBaseApi } from './base';
import {ApiResponse, InventoryData} from "~/api/types";

export default class StockApi extends ArkavidiaBaseApi {
  async getInventory(): Promise<InventoryData[]> {
    const response = await this.axios.get(`/item`);
    return response.data.data.array;
  }

  async createItem({amount, owner, name, price}): Promise<ApiResponse<void>> {
    const payload = {
      name: name,
      price: price,
      ownerId: owner.id,
      qty: amount
    };
    return this.axios.post(`/item`, payload);
  }
}

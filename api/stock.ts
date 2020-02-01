import { ArkavidiaBaseApi } from './base';
import {InventoryData} from "~/api/types";

export default class StockApi extends ArkavidiaBaseApi {
  async getInventory(): Promise<InventoryData[]> {
    const response = await this.axios.get(`/item`);
    return response.data.data.array;
  }
}

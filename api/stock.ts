import {ArkavidiaBaseApi} from './base';
import { InventoryData, Pagination, Tenant } from "~/api/types";

export default class StockApi extends ArkavidiaBaseApi {
  async getInventory({page, itemPerPage = 10}): Promise<Pagination<InventoryData>> {
    const response = await this.axios.get(`/item`, {params: {page, itemPerPage}});
    return {
      data: response.data.data.array,
      page: response.data.data.page,
      totalPages: Math.ceil(response.data.data.total / response.data.data.itemPerPage)
    };
  }

  async createItem({amount, ownerId, name, price}): Promise<void> {
    const payload = {
      name,
      price,
      ownerId,
      qty: amount
    };
    await this.axios.post(`/item`, payload);
  }

  async getItem({id}): Promise<InventoryData> {
    const response = await this.axios.get(`/item/${id}`);
    return response.data.data;
  }

  async updateItem({id, amount, name, price}): Promise<void> {
    const payload = {
      name: name,
      price: price,
      qty: amount
    };
    await this.axios.put(`/item/${id}`, payload);
  }

  async deleteItem({id}): Promise<void> {
    await this.axios.delete(`/item/${id}`);
  }

  async getItemPerOwner(): Promise<Tenant[]> {
    const response = await this.axios.get(`/user/item`);
    return response.data.data.array;
  }
}

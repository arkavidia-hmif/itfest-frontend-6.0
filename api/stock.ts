import {ArkavidiaBaseApi} from './base';
import {ApiResponse, InventoryData, Pagination} from "~/api/types";

export default class StockApi extends ArkavidiaBaseApi {
  async getInventory({page, itemPerPage = 10}): Promise<Pagination<InventoryData>> {
    const response = await this.axios.get(`/item`, {params: {page, itemPerPage}});
    return {
      data: response.data.data.array,
      page: response.data.data.page,
      totalPages: Math.ceil(response.data.data.total / response.data.data.itemPerPage)
    };
  }

  async createItem({amount, ownerId, name, price}): Promise<ApiResponse<void>> {
    const payload = {
      name,
      price,
      ownerId,
      qty: amount
    };
    return this.axios.post(`/item`, payload);
  }

  async getItem({id}): Promise<InventoryData> {
    const response = await this.axios.get(`/item/${id}`);
    return response.data.data;
  }

  async updateItem({id, amount, name, price}): Promise<ApiResponse<void>> {
    const payload = {
      name: name,
      price: price,
      qty: amount
    };
    return this.axios.put(`/item/${id}`, payload);
  }
}

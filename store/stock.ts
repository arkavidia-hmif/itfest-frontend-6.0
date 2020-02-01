import {InventoryData} from "~/api/types";
import arkavidiaApi from "~/api/api";

export interface StockState {
  inventory: InventoryData[]

}

export const state = () => ({
  inventory: []
});

export const getters = {
  getInventory(state: StockState): InventoryData[] {
    return state.inventory;
  },
};

export const mutations = {
  setInventory(state: StockState, {inventory}) {
    state.inventory = inventory;
  },
};

export const actions = {
  async fetchInventory({commit}): Promise<InventoryData[]> {
    const inventory = await arkavidiaApi.stock.getInventory();
    commit('setInventory', {inventory});
    return inventory;
  }
};

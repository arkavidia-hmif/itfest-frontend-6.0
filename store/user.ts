import arkavidiaApi from '~/api/api';
import {Transaction, UserData} from '~/api/types';

export interface UserState {
  user?: UserData;
  transactions: Transaction[];
}


export const namespaced = true;

export const state = () => ({
  user: undefined,
  transactions: []
});

export const getters = {
  getUser(state: UserState): UserData|undefined {
    return state.user;
  },
  getTransactions(state: UserState): Transaction[] {
    return state.transactions;
  },

};

export const mutations = {
  setUser(state: UserState, { user }) {
    state.user = user;
  },
  setTransactions(state: UserState, { transactions }) {
    state.transactions = transactions;
  },
  clearUser(state: UserState) {
    state.user = undefined;
  }
};

export const actions = {
  async fetchUser({ commit }): Promise<UserData> {
    const user = await arkavidiaApi.user.getProfile();
    commit('setUser', { user });
    return user;
  },
  async fetchTransactions({ commit }): Promise<Transaction[]> {
    const transactions = await arkavidiaApi.user.getTransactions();
    commit('setTransactions', {transactions});
    return transactions;
  }
};

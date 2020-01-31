import arkavidiaApi from '~/api/api';
import {Transaction, UserData, qrcode} from '~/api/types';

export interface UserState {
  user?: UserData;
  transactions: Transaction[];
  qrid: qrcode;
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
  getQRID(state: UserState): qrcode {
    return state.qrid;
  }
};

export const mutations = {
  setUser(state: UserState, { user }) {
    state.user = user;
  },
  setTransactions(state: UserState, { transactions }) {
    state.transactions = transactions;
  },
  setQRID(state: UserState, { qrid }) {
    state.qrid = qrid;
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
  },
  async fetchQRID({ commit }): Promise<qrcode> {
    const qrcode = await arkavidiaApi.user.getQRID();
    commit('setQRID', {qrcode});
    return qrcode;
  }
};

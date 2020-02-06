import arkavidiaApi from '~/api/api';
import {Transaction, UserData, Qrcode} from '~/api/types';

export interface UserState {
  user?: UserData;
  transactions: { [page: number] : Transaction[] };
  qrcode: Qrcode;
}


export const namespaced = true;

export const state = () => ({
  user: undefined,
  transactions: [],
  qrcode: undefined
});

export const getters = {
  getUser(state: UserState): UserData|undefined {
    return state.user;
  },
  getTransactions(state: UserState): Transaction[] {
    const transactions = Object.keys(state.transactions)
      .sort()
      .map(key => state.transactions[key])
      .reduce((accumulator: Transaction[], currentValue: Transaction[]) => {
        return accumulator.concat(currentValue);
      }, []);

    return transactions;

    // return state.transactions;
  },
  getQRID(state: UserState): Qrcode|undefined {
    return state.qrcode;
  }
};

export const mutations = {
  setUser(state: UserState, { user }) {
    state.user = user;
  },
  setUserPartially(state: UserState, {name, email, dob, gender, interest}) {
    if (state.user) {
      state.user.name = name;
      state.user.email = email;
      state.user.dob = dob;
      state.user.gender = gender;
      state.user.interest = interest;
    }
  },

  setTransactions(state: UserState, { page, transactions }) {
    const currentTransactions = { ...state.transactions };
    currentTransactions[page] = transactions;
    state.transactions = currentTransactions;
  },
  setQRID(state: UserState, { qrcode }) {
    state.qrcode = qrcode;
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
  async updateProfile({ commit }, { name, email, password, dob, gender, interest }): Promise<void> {
    await arkavidiaApi.user.updateProfile({name, email, password, dob, gender, interest});
    commit('setUserPartially', {name, email, dob, gender, interest});
  },
  async fetchTransactions({ commit }, { page, itemPerPage }): Promise<Transaction[]> {
    const transactions = await arkavidiaApi.user.getTransactions(page, itemPerPage);
    commit('setTransactions', { page, transactions });
    return transactions;
  },
  async fetchQRID({ commit }): Promise<Qrcode> {
    const qrcode = await arkavidiaApi.user.getQRID();
    commit('setQRID', { qrcode });
    return qrcode;
  }
};

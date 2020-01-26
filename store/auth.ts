import arkavidiaApi from '~/api/api';
import { TenantAccount, VisitorAccount } from '~/api/types';

export interface AuthState {
  loggedIn: boolean;
  loggedInAt?: number;
  bearerToken?: string;
}

export const namespaced = true;

export const state = () => ({
  loggedIn: false,
  loggedInAt: null,
  bearerToken: null
});

export const getters = {
  isLoggedIn(state: AuthState) {
    return state.loggedIn;
  },
  getToken(state: AuthState) {
    return state.bearerToken;
  }
};

export const mutations = {
  setLogin(state: AuthState, { bearerToken }) {
    state.loggedIn = true;
    state.loggedInAt = Date.now();
    state.bearerToken = bearerToken;
  },
  setLogout(state: AuthState) {
    state.loggedIn = false;
    state.loggedInAt = undefined;
    state.bearerToken = undefined;
  }
};

export const actions = {
  async login({ commit }, { username, password }) {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    let bearerToken;
    if (emailRegex.test(username)) {
      bearerToken = await arkavidiaApi.auth.loginByEmail(username, password);
    }
    else {
      bearerToken = await arkavidiaApi.auth.loginByUsername(username, password);
    }

    commit('setLogin', { bearerToken });
  },

  async logout({ commit }) {
    await commit('setLogout');
  },

  async visitorRegister({ commit }, visitorAccount: VisitorAccount) {
    const bearerToken = await arkavidiaApi.auth.visitorRegister(visitorAccount);
    commit('setLogin', { bearerToken });
  },

  async tenantRegister({ commit }, tenantAccount: TenantAccount) {
    const bearerToken = await arkavidiaApi.auth.tenantRegister(tenantAccount);
    commit('setLogin', { bearerToken });
  }
};

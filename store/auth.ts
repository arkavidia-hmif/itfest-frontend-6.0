import arkavidiaApi from '~/api/api';
import { TenantAccount } from '~/api/types';

export interface AuthState {
  loggedIn: boolean;
  loggedInAt?: number;
  bearerToken?: string;
  userRole?: string;
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
  },
  getUserRole(state: AuthState) {
    return state.userRole;
  }
};

export const mutations = {
  setLogin(state: AuthState, { bearerToken }) {
    state.loggedIn = true;
    state.loggedInAt = Date.now();
    state.bearerToken = bearerToken;
  },
  setUserRole(state: AuthState, { userRole }) {
    state.userRole = userRole;
  },
  setLogout(state: AuthState) {
    state.loggedIn = false;
    state.loggedInAt = undefined;
    state.bearerToken = undefined;
  }
};

export const actions = {
  async login({ commit }, { userid, password }) {

    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let bearerToken;
    if (emailRegex.test(userid)) {
      let email = userid;
      bearerToken = await arkavidiaApi.auth.loginByEmail(email, password);
    }
    else {
      let username = userid;
      bearerToken = await arkavidiaApi.auth.loginByUsername(username, password);
    }

    commit('setLogin', { bearerToken });

    const userData = await arkavidiaApi.user.getProfile();

    commit('setUserRole', { userRole: userData.role.toString() });
  },

  async logout({ commit }) {
    await commit('setLogout');
  },

  async visitorRegister({ commit }, {name, email, voucher, password, dob, gender, interest}) {
    const bearerToken = await arkavidiaApi.auth.visitorRegister({name, email, voucher, password, dob, gender, interest});
    commit('setLogin', { bearerToken });
  },

  async tenantRegister({ commit }, tenantAccount: TenantAccount) {
    const bearerToken = await arkavidiaApi.auth.tenantRegister(tenantAccount);
    commit('setLogin', { bearerToken });
  }
};

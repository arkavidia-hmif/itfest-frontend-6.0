import arkavidiaApi from '~/api/api';
import { UserData } from '~/api/types';

export interface UserState {
  user?: UserData;
}

export const namespaced = true;

export const state = () => ({
  user: undefined
});

export const getters = {
  getUser(state: UserState): UserData|undefined {
    return state.user;
  }
};

export const mutations = {
  setUser(state: UserState, { user }) {
    state.user = user;
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
  }
};

import arkavidiaApi from '~/api/api';
import {Qrcode} from '~/api/types';

export interface GameState {
  review: number;
}

export interface qrcodestate {
  qr: Qrcode;
}
export const namespaced = true;

export const state = () => ({
  review: 0,
  qr: undefined
});

export const getters = {
  getReview(state: GameState): number {
    return state.review;
  },
  getQrcode(state:qrcodestate): Qrcode{
    return state.qr;
  }
};

export const mutations = {
  setReview(state: GameState, { review }) {
    state.review = review;
  },
  setQrcode(state:qrcodestate, {qr}){
    state.qr = qr;
  },
};

export const actions = {
  //eslint-disable-next-line no-empty-pattern
  async playGame({ }, { qrId, difficultyLevels }): Promise<void> {
    try {
      const response = await arkavidiaApi.game.play(qrId, difficultyLevels);
      return response;
    } catch (e) {
      return e.response;
    }
  },
  async fetchReview({ commit }, { tenantId }): Promise<number> {
    const review = await arkavidiaApi.game.getTenantReview(tenantId);
    commit("setReview", { review });
    return review;
  },
  //eslint-disable-next-line no-empty-pattern
  async sendReview({ }, { tenantId, tenantReview }): Promise<void> {
    await arkavidiaApi.game.sendTenantReview(tenantId, tenantReview);
  },

  async changeQrCode({commit}, {qr}): Promise<Qrcode>{
    const response = await arkavidiaApi.game.getPlayName(qr);

    const data = {
      qrid: qr,
      name: response.data.data.name
    };
    commit('setQrcode', {qr: data});
    return data;
  },

  // eslint-disable-next-line no-empty-pattern
  async getStatus({ }, {qr}): Promise<Object>{
    try {
      const response = await arkavidiaApi.game.getPlayStatus(qr);
      // eslint-disable-next-line no-console
      // console.log(response);
      return response;

    }
    catch (e) {
      // eslint-disable-next-line no-console
      // console.log(e.response.status);
      // eslint-disable-next-line no-console
      // console.log(e.response);
      return e.response;
    }

  }
};

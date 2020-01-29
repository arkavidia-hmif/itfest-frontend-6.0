import arkavidiaApi from '~/api/api';
import {qrcode} from '~/api/types';

export interface GameState {
  review: number;
}

export interface qrcodestate {
  qr: qrcode;
}
export const namespaced = true;

export const state = () => ({
  review: 0,
  qr: ''
});

export const getters = {
  getReview(state: GameState): number {
    return state.review;
  },
  getQrcode(state:qrcodestate): qrcode{
    return state.qr;
  }
};

export const mutations = {
  setReview(state: GameState, { review }) {
    state.review = review;
  },
  setQrcode(state:qrcodestate, {qr}){
    state.qr = qr;
  }
};

export const actions = {
  //eslint-disable-next-line no-empty-pattern
  async playGame({ }, { qrId, difficultiyLevels }): Promise<void> {
    await arkavidiaApi.game.play(qrId, difficultiyLevels);
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
  changeQrCode({commit}, {qr}) {
    commit('setQrcode', {qr: qr});
  }
};

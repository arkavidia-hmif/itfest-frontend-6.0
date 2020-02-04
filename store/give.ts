import arkavidiaApi from '~/api/api';
import { Qrcode } from '~/api/types';

export interface qrcodestate {
  qr: Qrcode;
}
export const namespaced = true;

export const getters = {
  getVisitorQR(state:qrcodestate): Qrcode {
    return state.qr;
  }
}

export const mutations = {
  setVisitorQR(state:qrcodestate): Qrcode {
    return state.qr;
  }
}

export const actions = {
  async fetchVisitorQR({ commit }, { qr }): Promise<Qrcode> {
    const response = await arkavidiaApi.user.getVisitorQR(qr);
    const data = {
      qrid: qr,
      name: response.data.data.name;
    };
    commit('setVisitorQR', {qrid: data});
    return data;
  }
}
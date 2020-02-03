export interface RedemptionTarget {
  QRid: string;
  username: string;
  name: string;
  role: string;
}

export interface RedemptionState {
  target?: RedemptionTarget;
}

export const namespaced = true;

export const state = () => ({
  targetQRid: undefined
});

export const getters = {
  getTarget(state: RedemptionState): RedemptionTarget | undefined {
    return state.target;
  }
};

export const mutations = {
  setTarget(state: RedemptionState, {qrid, username, name, role}) {
    state.target = {
      QRid: qrid,
      username,
      name,
      role
    };
  }
};

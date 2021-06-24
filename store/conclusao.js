export const state = () => ({
  concluido: false
});

export const mutations = {
  SET_CONCLUDE(state, data) {
    state.concluido = data
  }
};

export const actions = {
  async concluir({ commit }, data) {
    commit("SET_CONCLUDE", data);
    return true
  }
};

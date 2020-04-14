export const state = {
  currentUser: null
};

export const mutations = {
  setCurrentUser(state, user) {
    state.currentUser = user;
  },

  resetCurrentUser(state) {
    state.currentUser = null;
  }
};

export const state = {
  // Summaries
  rolesSummaries: [],

  // List
  isListLoading: false,
  roles: [],
};

export const mutations = {
  // Summaries
  setRolesSummaries(state, rolesSummaries) {
    state.rolesSummaries = rolesSummaries;
  },

  // List
  setListLoading(state, isLoading) {
    state.isListLoading = isLoading;
  },
  setRoles(state, roles) {
    state.roles = roles;
  },
};

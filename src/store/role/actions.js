import request from "@/utils/request";

export default {
  async fetchSummaries({ commit }) {
    const { status, data } = await request("get", "/roles/summaries");

    if (status === 200) {
      commit("setRolesSummaries", data);
    }
  },

  async fetchRoles({ commit }) {
    commit("setListLoading", true);

    const { status, data } = await request("get", "/roles");

    if (status === 200) {
      commit("setRoles", data);
    }

    commit("setListLoading", false);
  },
};

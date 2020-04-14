import request from "@/common/request";

export default {
  async getCurrentUser({ commit }) {
    const { status, data } = await request("get", "/auth/current-user");

    if (status === 200) {
      commit("setCurrentUser", data);
    }
  }
};

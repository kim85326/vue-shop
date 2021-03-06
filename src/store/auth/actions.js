import request from "@/common/request";
import router from "@/router";

export default {
  async getCurrentUser({ commit }) {
    const { status, data } = await request("get", "/auth/current-user");

    if (status === 200) {
      commit("setCurrentUser", data);
    }
  },

  async login({ dispatch }, { username, password, validator }) {
    await validator.validateAll();

    if (validator.errors.items.length > 0) {
      return;
    }

    const { status, data } = await request("post", "/auth", { data: { username, password } });

    if (status === 200) {
      localStorage.setItem("token", data.token);
      await dispatch("getCurrentUser");
      const redirectPath = router.query && router.query.redirect ? router.query.redirect : "/";
      router.push(redirectPath);
    }
  },

  async logout({ commit }) {
    const { status } = await request("delete", "/auth");

    if (status === 204) {
      localStorage.removeItem("token");
      commit("resetCurrentUser");
      router.push("/login");
    }
  },

  async hasPermission({ state }, targetPermission) {
    const { permissions } = state.currentUser.role;

    if (permissions.find(permission => permission === targetPermission)) {
      return true;
    }

    return false;
  }
};

import { Message } from "element-ui";

import getRolesSummariesApi from "../../api/role";

export default {
  async fetchSummaries({ commit }) {
    try {
      const { data } = await getRolesSummariesApi();

      commit("setRolesSummaries", data);
    } catch (error) {
      console.error(error);
      const message = error.response.data.error_message || "未知錯誤";
      Message.error({ message });
    }
  }
};

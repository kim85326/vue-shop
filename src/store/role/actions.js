import { MessageBox, Message } from "element-ui";
import request from "@/common/request";

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

  async deleteRole({ dispatch }, row) {
    await MessageBox.confirm("是否刪除該角色？", "提示", {
      confirmButtonText: "確定",
      cancelButtonText: "取消",
      type: "warning"
    });

    const { status } = await request("delete", `/roles/${row.id}`);

    if (status === 204) {
      Message.success({ message: "刪除成功" });
      dispatch("fetchRoles");
    }
  },

  // Dialog
  async handleSubmitDialog({ state, getters, dispatch, commit }, validator) {
    await validator.validateAll();

    if (validator.errors.items.length > 0) {
      return;
    }

    await MessageBox.confirm("是否要確認?", "提示", {
      confirmButtonText: "確認",
      cancelButtonText: "取消",
      type: "warning"
    });

    let httpMethod = "post";
    let url = "/roles";
    let operation = "新增";

    if (getters.isDialogFormUpdateMode === true) {
      httpMethod = "patch";
      url = `/roles/${state.dialogForm.id}`;
      operation = "編輯";
    }

    const { status } = await request(httpMethod, url, { data: getters.getDialogRequestBody });

    if (status === 201 || status === 200) {
      Message.success({ message: `${operation}成功!` });
      commit("setDialogVisible", false);
      dispatch("fetchRoles");
    }
  }
};

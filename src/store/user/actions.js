import { Message, MessageBox } from "element-ui";
import request from "@/common/request";

export default {
  // List
  async fetchList({ commit, getters }) {
    commit("setListLoading", true);

    const { status, data, headers } = await request("get", "/users", {
      params: getters.getListParam
    });

    if (status === 200) {
      commit("setUsers", data);
      commit("updatePaginationFromHeaders", headers);
    }

    commit("setListLoading", false);
  },
  async deleteUser({ dispatch }, row) {
    await MessageBox.confirm("是否刪除該用戶？", "提示", {
      confirmButtonText: "確定",
      cancelButtonText: "取消",
      type: "warning"
    });

    const { status } = await request("delete", `/users/${row.id}`);

    if (status === 204) {
      Message.success({ message: "刪除成功" });
      dispatch("fetchList");
    }
  },
  async toggleEnabled({ dispatch }, row) {
    const { id } = row;
    const isEnabled = !row.isEnabled;

    await MessageBox.confirm(`是否要${isEnabled === true ? "啟用" : "停用"}此用戶?`, "提示", {
      confirmButtonText: "確認",
      cancelButtonText: "取消",
      type: "warning"
    });

    const { status } = await request(isEnabled === true ? "put" : "delete", `/users/${id}/enabled`);

    if (status === 204) {
      Message.success({ message: `${isEnabled === true ? "啟用" : "停用"}用戶成功！` });
      dispatch("fetchList");
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
    let url = "/users";
    let operation = "新增";

    if (getters.isDialogFormUpdateMode === true) {
      httpMethod = "patch";
      url = `/users/${state.dialogForm.id}`;
      operation = "編輯";
    }

    const { status } = await request(httpMethod, url, { data: getters.getDialogRequestBody });

    if (status === 201 || status === 200) {
      Message.success({ message: `${operation}成功!` });
      commit("setDialogVisible", false);
      dispatch("fetchList");
    }
  }
};

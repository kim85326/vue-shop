import { MessageBox, Message } from "element-ui";
import request from "@/common/request";

export default {
  async fetchCategories({ commit }) {
    commit("setListLoading", true);

    const { status, data } = await request("get", "/categories");

    if (status === 200) {
      commit("setCategories", data);
    }

    commit("setListLoading", false);
  },

  async deleteCategory({ dispatch }, row) {
    await MessageBox.confirm("是否刪除該分類？", "提示", {
      confirmButtonText: "確定",
      cancelButtonText: "取消",
      type: "warning"
    });

    const { status } = await request("delete", `/categories/${row.id}`);

    if (status === 204) {
      Message.success({ message: "刪除成功" });
      dispatch("fetchCategories");
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
    let url = "/categories";
    let operation = "新增";

    if (getters.isDialogFormUpdateMode === true) {
      httpMethod = "patch";
      url = `/categories/${state.dialogForm.id}`;
      operation = "編輯";
    }

    const { status } = await request(httpMethod, url, { data: getters.getDialogRequestBody });

    if (status === 201 || status === 200) {
      Message.success({ message: `${operation}成功!` });
      commit("setDialogVisible", false);
      dispatch("fetchCategories");
    }
  }
};

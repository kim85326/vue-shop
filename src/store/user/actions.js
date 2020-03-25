import { Message, MessageBox } from "element-ui";

import {
  getUserListApi,
  deleteUserApi,
  setUserEnabledApi,
  addUserApi,
  updateUserApi
} from "../../api/user";

export default {
  // List
  async fetchList({ commit, getters }) {
    try {
      commit("setListLoading", true);

      const { data, headers } = await getUserListApi({ ...getters.getListParam });

      commit("setUsers", data);
      commit("updatePaginationFromHeaders", headers);
    } catch (error) {
      console.error(error);
      const message = error.response.data.error_message || "未知錯誤";
      Message.error({ message });
    } finally {
      commit("setListLoading", false);
    }
  },
  async deleteUser({ dispatch }, row) {
    await MessageBox.confirm("是否刪除該用戶？", "提示", {
      confirmButtonText: "確定",
      cancelButtonText: "取消",
      type: "warning"
    });

    try {
      await deleteUserApi(row.id);

      Message.success({ message: "刪除成功" });
      dispatch("fetchList");
    } catch (error) {
      console.error(error);
      const message = error.response.data.error_message || "未知錯誤";
      Message.error({ message });
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

    try {
      await setUserEnabledApi(id, isEnabled);

      Message.success({ message: `${isEnabled === true ? "啟用" : "停用"}用戶成功！` });
      dispatch("fetchList");
    } catch (error) {
      console.error(error);
      const message = error.response.data.error_message || "未知錯誤";
      Message.error({ message });
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

    try {
      if (getters.isDialogFormUpdateMode === false) {
        await addUserApi(state.dialogForm);
      } else {
        await updateUserApi(state.dialogForm);
      }

      const operation = getters.isDialogFormUpdateMode === false ? "新增" : "編輯";
      Message.success({ message: `${operation}成功!` });
      commit("setDialogVisible", false);
      dispatch("fetchList");
    } catch (error) {
      console.error(error);
      const message = error.response.data.error_message || "未知錯誤";
      Message.error({ type: "error", message });
    }
  }
};

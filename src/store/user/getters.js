import { getField } from "vuex-map-fields";

export default {
  getField,

  // List
  getListParam(state) {
    return {
      page: state.pagination.currentPage,
      pageSize: state.pagination.pageSize,
      keyword: state.listQuery.keyword !== undefined ? state.listQuery.keyword : undefined
    };
  },

  // Dialog
  isDialogFormUpdateMode(state) {
    return state.dialogForm.id !== 0;
  },
  isDialogFormPasswordEnabled(state) {
    return state.dialogForm.password !== undefined;
  },
  getDialogRequestBody(state) {
    return {
      roleId: state.dialogForm.role.id,
      username: state.dialogForm.username,
      name: state.dialogForm.name,
      email: state.dialogForm.email,
      password: state.dialogForm.password,
      remark: state.dialogForm.remark,
      isEnabled: state.dialogForm.isEnabled
    };
  }
};

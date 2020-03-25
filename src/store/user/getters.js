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
  }
};

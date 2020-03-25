import Vue from "vue";

import getPaginationFromHeaders from "../../utils/headers";

const defaultListQuery = {
  keyword: undefined
};

const defaultPagination = {
  pageSizes: [2, 5, 10],
  pageSize: 10,
  currentPage: 1,
  total: 0
};

const defaultRole = {
  id: undefined,
  name: ""
};

const defaultDialogForm = {
  id: 0,
  role: { ...defaultRole },
  username: "",
  name: "",
  email: "",
  password: "",
  remark: "",
  isEnabled: true
};

export const state = {
  // List
  isListLoading: false,
  users: [],
  pagination: { ...defaultPagination },
  listQuery: { ...defaultListQuery },

  // Dialog
  isDialogVisible: false,
  dialogForm: { ...defaultDialogForm },
  selectableRoles: []
};

export const mutations = {
  // List
  setListLoading(state, isLoading) {
    state.isListLoading = isLoading;
  },
  setUsers(state, users) {
    state.users = users;
  },
  updatePaginationFromHeaders(state, headers) {
    state.pagination = { ...state.pagination, ...getPaginationFromHeaders(headers) };
  },
  setPaginationCurrentPage(state, page) {
    state.pagination.currentPage = page;
  },
  setPaginationPageSize(state, pageSize) {
    state.pagination.pageSize = pageSize;
  },
  initListQuery(state) {
    state.listQuery = { ...defaultListQuery };
  },

  // Dialog
  setDialogVisible(state, isVisible) {
    state.isDialogVisible = isVisible;
  },
  initDialogForm(state) {
    state.dialogForm = { ...defaultDialogForm };
    state.dialogForm.role = { ...defaultRole };
  },
  setDialogForm(state, user) {
    state.dialogForm = user;
    Vue.set(state.dialogForm, "password", undefined);
  }
};

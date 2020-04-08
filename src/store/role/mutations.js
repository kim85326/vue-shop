import permissionList from "@/common/permissionList";

const defaultDialogForm = {
  id: 0,
  name: "",
  description: "",
  permissions: permissionList.map(permission => permission.name)
};

export const state = {
  // Summaries
  rolesSummaries: [],

  // List
  isListLoading: false,
  roles: [],

  // Dialog
  isDialogVisible: false,
  dialogForm: { ...defaultDialogForm }
};

export const mutations = {
  // Summaries
  setRolesSummaries(state, rolesSummaries) {
    state.rolesSummaries = rolesSummaries;
  },

  // List
  setListLoading(state, isLoading) {
    state.isListLoading = isLoading;
  },
  setRoles(state, roles) {
    state.roles = roles;
  },

  // Dialog
  setDialogVisible(state, isVisible) {
    state.isDialogVisible = isVisible;
  },
  initDialogForm(state) {
    state.dialogForm = { ...defaultDialogForm };
  },
  setDialogForm(state, role) {
    state.dialogForm = role;
  },
  setDialogFormPermissions(state, permissions) {
    state.dialogForm.permissions = permissions;
  }
};

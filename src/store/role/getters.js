import { getField } from "vuex-map-fields";

export default {
  getField,

  // Dialog
  isDialogFormUpdateMode(state) {
    return state.dialogForm.id !== 0;
  },
  getDialogRequestBody(state) {
    return {
      name: state.dialogForm.name,
      description: state.dialogForm.description,
      permissions: state.dialogForm.permissions
    };
  }
};

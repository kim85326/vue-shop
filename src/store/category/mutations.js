import { updateField } from "vuex-map-fields";

const defaultDialogForm = {
  id: 0,
  name: "",
  parentIds: [],
  parentOptions: []
};

export const state = {
  // List
  isListLoading: false,
  categories: [],

  // Dialog
  isDialogVisible: false,
  dialogForm: { ...defaultDialogForm }
};

export const mutations = {
  updateField,

  // List
  setListLoading(state, isLoading) {
    state.isListLoading = isLoading;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },

  // Dialog
  setDialogVisible(state, isVisible) {
    state.isDialogVisible = isVisible;
  },
  initDialogForm(state) {
    state.dialogForm = { ...defaultDialogForm };
  },
  setDialogForm(state, category) {
    state.dialogForm = { ...state.dialogForm, ...category };
  },
  setDialogFormParentOptions(state, parentOptions) {
    state.dialogForm.parentOptions = parentOptions;
  }
};

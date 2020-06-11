import { getField } from "vuex-map-fields";

export default {
  getField,

  // Dialog
  isDialogFormUpdateMode(state) {
    return state.dialogForm.id !== 0;
  },
  dialogParentOptions(state) {
    const convertToOption = categories => {
      if (categories.length === 0) {
        return null;
      }

      // 目前系統只允許三層分類，因此父分類選項濾掉第三級分類
      const parentCategories = categories.filter(category => category.level < 3);

      if (parentCategories.length === 0) {
        return null;
      }

      return parentCategories.map(category => ({
        value: category.id,
        label: category.name,
        children: convertToOption(category.children)
      }));
    };

    return convertToOption(state.categories);
  },
  getDialogRequestBody(state, getters) {
    let parentId = null;
    if (state.dialogForm.parentIds.length > 0) {
      parentId = state.dialogForm.parentIds[state.dialogForm.parentIds.length - 1];
    }

    return {
      name: state.dialogForm.name,
      parentId: getters.isDialogFormUpdateMode === true ? undefined : parentId
    };
  }
};

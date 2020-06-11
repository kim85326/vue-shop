<template>
	<el-dialog
		:title="isDialogFormUpdateMode? '編輯分類' : '新增分類'"
		:visible="isDialogVisible"
		@close="handleCloseDialog()"
		class="dialog__category"
	>
		<el-form
			ref="form"
			size="small"
			label-width="100px"
			@submit.prevent.native
		>
			<Name />
			<ParentCategory v-if="isDialogFormUpdateMode === false" />
		</el-form>
		<div slot="footer">
			<el-button
				size="small"
				@click="handleCloseDialog()"
			>取 消</el-button>
			<el-button
				size="small"
				type="primary"
				@click="handleSubmitDialog($validator)"
			>確 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Name from "./Name.vue";
import ParentCategory from "./ParentCategory.vue";

export default {
	$_veeValidate: {
		validator: "new"
	},
	components: {
		Name,
		ParentCategory,
	},
	methods: {
		...mapActions("category", [
			"handleSubmitDialog",
		]),
		handleCloseDialog() {
			this.$store.commit("category/setDialogVisible", false);
			this.$store.commit("category/initDialogForm");
			this.$validator.reset();
		},
	},
	computed: {
		...mapState("category", ["isDialogVisible"]),
		...mapGetters("category", ["isDialogFormUpdateMode"]),
	},
};
</script>

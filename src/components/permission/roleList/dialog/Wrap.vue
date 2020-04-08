<template>
	<el-dialog
		:title="isDialogFormUpdateMode? '編輯角色' : '新增角色'"
		:visible="isDialogVisible"
		@close="handleCloseDialog()"
		class="dialog__role"
	>
		<el-form
			ref="form"
			size="small"
			label-width="150px"
		>
			<Name />
			<Description />
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
import Description from "./Description.vue";

export default {
	$_veeValidate: {
		validator: "new"
	},
	components: {
		Name,
		Description,
	},
	methods: {
		...mapActions("role", [
			"handleSubmitDialog",
		]),
		handleCloseDialog() {
			this.$store.commit("role/setDialogVisible", false);
			this.$store.commit("role/initDialogForm");
			this.$validator.reset();
		},
	},
	computed: {
		...mapState("role", ["isDialogVisible"]),
		...mapGetters("role", ["isDialogFormUpdateMode"]),
	},
};
</script>

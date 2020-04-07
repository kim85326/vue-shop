<template>
	<el-dialog
		:title="isDialogFormUpdateMode? '編輯用戶' : '新增用戶'"
		:visible="isDialogVisible"
		@close="handleCloseDialog()"
		class="dialog__user"
	>
		<el-form
			ref="form"
			size="small"
			label-width="150px"
		>
			<Username />
			<Name />
			<Email />
			<Password />
			<Role />
			<Remark />
			<EnableStatus />
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

import Username from "./Username.vue";
import Name from "./Name.vue";
import Email from "./Email.vue";
import Password from "./Password.vue";
import Role from "./Role.vue";
import Remark from "./Remark.vue";
import EnableStatus from "./EnableStatus.vue";

export default {
	$_veeValidate: {
		validator: "new"
	},
	components: {
		Username,
		Name,
		Email,
		Password,
		Role,
		Remark,
		EnableStatus
	},
	methods: {
		...mapActions("user", [
			"handleSubmitDialog",
		]),
		handleCloseDialog() {
			this.$store.commit("user/setDialogVisible", false);
			this.$store.commit("user/initDialogForm");
			this.$validator.reset();
		},
	},
	computed: {
		...mapState("user", ["isDialogVisible"]),
		...mapGetters("user", ["isDialogFormUpdateMode"]),
	},
};
</script>

<template>
	<el-form-item label="密碼：">
		<el-input
			type="password"
			v-model="password"
			v-validate="{ required: isDialogFormPasswordEnabled }"
			name="password"
			:class="{ error: errors.has('password') }"
			:placeholder="isDialogFormPasswordEnabled === false? '點擊解鎖' : null"
			:readonly="isDialogFormPasswordEnabled === false"
			@focus="changeUserPassword()"
			ref="passwordInput"
			show-password
		></el-input>
	</el-form-item>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapGetters } from "vuex";

export default {
	inject: ["$validator"],
	computed: {
		...mapFields("user", ["dialogForm.password"]),
		...mapGetters("user", ["isDialogFormPasswordEnabled"]),
	},
	methods: {
		changeUserPassword() {
			if (this.isDialogFormPasswordEnabled === false) {
				this.$refs.passwordInput.blur();
				this.$confirm("是否要修改密碼?", "提示", {
					confirmButtonText: "確認",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.password = "";
				});
			}
		}
	},
};
</script>

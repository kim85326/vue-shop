<template>
	<el-dialog
		:title="isDialogFormUpdateMode? '編輯用戶' : '新增用戶'"
		:visible="isDialogVisible"
		@close="handleCloseDialog()"
		class="user-dialog"
	>
		<el-form
			ref="form"
			size="small"
			label-width="150px"
		>
			<el-form-item label="帳號：">
				<el-input
					v-model="username"
					v-validate="{ required: true }"
					name="username"
					:class="{ error: errors.has('username') }"
				></el-input>
			</el-form-item>
			<el-form-item label="姓名：">
				<el-input
					v-model="name"
					v-validate="{ required: true }"
					name="name"
					:class="{ error: errors.has('name') }"
				></el-input>
			</el-form-item>
			<el-form-item label="信箱：">
				<el-input
					v-model="email"
					v-validate="{ required: true, email: true }"
					name="email"
					:class="{ error: errors.has('email') }"
				></el-input>
			</el-form-item>
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
			<el-form-item label="角色：">
				<el-select
					v-model="roleId"
					v-validate="{ required: true }"
					name="roleId"
					:class="{ error: errors.has('roleId') }"
					placeholder=""
				>
					<el-option
						v-for="role in selectableRoles"
						:key="role.id"
						:label="role.name"
						:value="role.id"
					>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="備註：">
				<el-input
					type="textarea"
					v-model="remark"
					:rows="5"
				></el-input>
			</el-form-item>
			<el-form-item label="是否啟用：">
				<el-radio-group v-model="isEnabled">
					<el-radio :label="true">是</el-radio>
					<el-radio :label="false">否</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<div
			slot="footer"
			class="dialog-footer"
		>
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
import { mapFields } from "vuex-map-fields";

export default {
	$_veeValidate: {
		validator: "new"
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
	computed: {
		...mapState("user", ["isDialogVisible"]),
		...mapGetters("user", ["isDialogFormUpdateMode", "isDialogFormPasswordEnabled"]),
		...mapState("role", {
			selectableRoles: (state) => state.rolesSummaries
		}),
		...mapFields("user", [
			"dialogForm.id",
			"dialogForm.username",
			"dialogForm.name",
			"dialogForm.email",
			"dialogForm.password",
			"dialogForm.remark",
			"dialogForm.isEnabled"
		]),
		...mapFields("user", {
			roleId: "dialogForm.role.id",
		}),
	},
	created() {
		this.$store.dispatch("role/fetchSummaries");
	}
};
</script>

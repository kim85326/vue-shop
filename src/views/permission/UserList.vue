<template>
	<div>
		<SearchBar />
		<Operation />
		<el-table
			:data="user.users"
			border
			style="width: 100%"
			v-loading="user.isListLoading"
		>
			<el-table-column
				prop="id"
				label="編號"
				width="70"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="username"
				label="帳號"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="name"
				label="姓名"
				width="130"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="email"
				label="信箱"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="createdTime"
				label="建立時間"
				width="180"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="latestLoginTime"
				label="最後登入"
				width="180"
				align="center"
			>
			</el-table-column>
			<el-table-column
				label="是否啟用"
				width="120"
				align="center"
			>
				<template slot-scope="scope">
					<el-switch
						:value="scope.row.isEnabled"
						@change="toggleEnabled(scope.row)"
					>
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column
				label="操作"
				width="120"
				align="center"
			>
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="text"
						@click="handleUpdate(scope.row)"
					>
						編輯
					</el-button>
					<el-button
						size="mini"
						type="text"
						@click="deleteUser(scope.row)"
					>
						刪除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<Pagination />
		</div>
		<el-dialog
			:title="isDialogFormUpdateMode? '編輯用戶' : '新增用戶'"
			:visible="user.isDialogVisible"
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
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";

import SearchBar from "@/components/permission/userList/SearchBar.vue";
import Operation from "@/components/permission/userList/Operation.vue";
import Pagination from "@/components/permission/userList/Pagination.vue";

export default {
	$_veeValidate: {
		validator: "new"
	},
	components: {
		SearchBar,
		Operation,
		Pagination,
	},
	methods: {
		...mapActions("user", [
			"toggleEnabled",
			"deleteUser",
			"handleSubmitDialog",
		]),
		handleCloseDialog() {
			this.$store.commit("user/setDialogVisible", false);
			this.$store.commit("user/initDialogForm");
			this.$validator.reset();
		},
		handleUpdate(row) {
			this.$store.commit("user/setDialogVisible", true);
			this.$store.commit("user/setDialogForm", { ...row });
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
		...mapState(["user"]),
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
		this.$store.dispatch("user/fetchList");
		this.$store.dispatch("role/fetchSummaries");
	}
};
</script>

<style>
.search-bar-container,
.operation-container {
	margin-bottom: 20px;
}

.search-bar-header,
.operation {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.search-bar-title,
.operation-title {
	display: flex;
}

.search-bar-title i,
.operation-title i {
	margin-right: 6px;
}

.search-bar-body {
	margin-top: 8px;
	padding-left: 32px;
}

.search-bar .el-form--inline .el-form-item {
	margin-bottom: 0;
}

.pagination {
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
}

.user-dialog .el-dialog {
	width: 540px;
}

.user-dialog .el-input,
.user-dialog .el-textarea {
	width: 250px;
}

.error input {
	border: 1px solid red;
}
</style>
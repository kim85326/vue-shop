<template>
	<div>
		<el-card
			shadow="never"
			class="filter-container"
		>
			<div class="filter">
				<div class="filter-header">
					<div class="filter-title">
						<i class="el-icon-search"></i>
						<span>篩選搜尋</span>
					</div>
					<div class="filter-operation">
						<el-button
							size="mini"
							@click="handleResetFilter"
						>
							重置
						</el-button>
						<el-button
							size="mini"
							type="primary"
							@click="handleSearchList"
						>
							查詢
						</el-button>
					</div>
				</div>
				<div class="filter-body">
					<el-form
						:inline="true"
						:model="listQuery"
					>
						<el-form-item label="輸入搜尋：">
							<el-input
								size="small"
								v-model="listQuery.keyword"
								placeholder="帳號/姓名"
							></el-input>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</el-card>
		<el-card
			shadow="never"
			class="operation-container"
		>
			<div class="operation">
				<div class="operation-title">
					<i class="el-icon-tickets"></i>
					<span>資料列表</span>
				</div>
				<el-button
					size="mini"
					@click="handleAdd"
				>
					新增
				</el-button>
			</div>
		</el-card>
		<el-table
			:data="users"
			border
			style="width: 100%"
			v-loading="isUserListLoading"
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
						v-model="scope.row.isEnabled"
						@change="handleIsEnbaleChange(scope.row)"
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
						@click="handleDelete(scope.row)"
					>
						刪除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination
				background
				:current-page="pagination.currentPage"
				:page-sizes="pagination.pageSizes"
				:page-size="pagination.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pagination.total"
				@size-change="handlePageSizeChange"
				@current-change="handleCurrentPageChange"
			>
			</el-pagination>
		</div>
		<el-dialog
			:title="isUpdateMode? '編輯用戶' : '新增用戶'"
			:visible.sync="isUserDialogVisible"
			class="user-dialog"
		>
			<el-form
				ref="form"
				:model="userForm"
				size="small"
				label-width="150px"
			>
				<el-form-item label="帳號：">
					<el-input
						v-model="userForm.username"
						v-validate="{ required: true }"
						name="username"
						:class="{ error: errors.has('username') }"
					></el-input>
				</el-form-item>
				<el-form-item label="姓名：">
					<el-input
						v-model="userForm.name"
						v-validate="{ required: true }"
						name="name"
						:class="{ error: errors.has('name') }"
					></el-input>
				</el-form-item>
				<el-form-item label="信箱：">
					<el-input
						v-model="userForm.email"
						v-validate="{ required: true, email: true }"
						name="email"
						:class="{ error: errors.has('email') }"
					></el-input>
				</el-form-item>
				<el-form-item label="密碼：">
					<el-input
						type="password"
						v-model="userForm.password"
						v-validate="{ required: isUserFormPasswordEnabled }"
						name="password"
						:class="{ error: errors.has('password') }"
						:placeholder="isUserFormPasswordEnabled === false? '點擊解鎖' : null"
						:readonly="isUserFormPasswordEnabled === false"
						@focus="changeUserPassword()"
						ref="passwordInput"
						show-password
					></el-input>
				</el-form-item>
				<el-form-item label="角色：">
					<el-select
						v-model="userForm.role.id"
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
						v-model="userForm.remark"
						:rows="5"
					></el-input>
				</el-form-item>
				<el-form-item label="是否啟用：">
					<el-radio-group v-model="userForm.isEnabled">
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
					@click="isUserDialogVisible = false"
				>取 消</el-button>
				<el-button
					size="small"
					type="primary"
					@click="handleSubmitUserDialog"
				>確 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { getUserListApi, addUserApi, updateUserApi, setUserEnabledApi, deleteUserApi } from "../../api/user";
import getRolesSummariesApi from "../../api/role";
import getPaginationFromHeaders from "../../utils/headers";

const defaultPagination = {
	pageSizes: [2, 5, 10],
	pageSize: 10,
	currentPage: 1,
	total: 0,
};

const defaultRole = {
	id: undefined,
	name: ""
};

const defaultUserForm = {
	id: 0,
	role: { ...defaultRole },
	username: "",
	name: "",
	email: "",
	password: "",
	remark: "",
	isEnabled: true
};

export default {
	data() {
		return {
			isUserListLoading: false,
			listQuery: {
				keyword: ""
			},
			users: [],
			pagination: defaultPagination,
			isUserDialogVisible: false,
			userForm: { ...defaultUserForm },
			selectableRoles: []
		};
	},
	methods: {
		async fetchUserList() {
			try {
				this.isUserListLoading = true;

				const params = {
					page: this.pagination.currentPage,
					pageSize: this.pagination.pageSize,
					keyword: this.listQuery.keyword.trim() ? this.listQuery.keyword.trim() : undefined
				};

				const { data, headers } = await getUserListApi(params);

				this.users = data;
				this.pagination = {
					...this.pagination,
					...getPaginationFromHeaders(headers)
				};
			} catch (error) {
				console.error(error);
				const message = error.response.data.error_message || "未知錯誤";
				this.$message({ type: "error", message });
			} finally {
				this.isUserListLoading = false;
			}
		},
		async fetchSelectableRoles() {
			try {
				const { data } = await getRolesSummariesApi();

				this.selectableRoles = data;
			} catch (error) {
				console.error(error);
				const message = error.response.data.error_message || "未知錯誤";
				this.$message({ type: "error", message });
			}
		},
		handleResetFilter() {
			this.listQuery.keyword = "";
		},
		handleSearchList() {
			this.pagination.currentPage = 1;
			this.fetchUserList();
		},
		handlePageSizeChange(pageSize) {
			this.pagination.pageSize = pageSize;
			this.pagination.currentPage = 1;
			this.fetchUserList();
		},
		handleCurrentPageChange(page) {
			this.pagination.currentPage = page;
			this.fetchUserList();
		},
		handleAdd() {
			this.isUserDialogVisible = true;
			this.userForm = { ...defaultUserForm };
			this.userForm.role = { ...defaultUserForm.role };
			this.$validator.reset();
		},
		handleUpdate(row) {
			this.isUserDialogVisible = true;
			this.userForm = { ...row };
			this.$validator.reset();
			this.$set(this.userForm, "password", undefined);
		},
		async deleteUser(id) {
			try {
				await deleteUserApi(id);

				this.$message({
					message: "刪除成功!",
					type: "success"
				});
				this.fetchUserList();
			} catch (error) {
				console.error(error);
				const message = error.response.data.error_message || "未知錯誤";
				this.$message({ type: "error", message });
			}
		},
		handleDelete(row) {
			this.$confirm("是否刪除該用戶？", "提示", {
				confirmButtonText: "確定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(async () => {
				await this.deleteUser(row.id);
			});
		},
		async addUser(user) {
			try {
				await addUserApi(user);

				this.$message({
					message: "新增成功!",
					type: "success"
				});

				this.isUserDialogVisible = false;
				this.fetchUserList();
			} catch (error) {
				console.error(error);
				const message = error.response.data.error_message || "未知錯誤";
				this.$message({ type: "error", message });
			}
		},
		async updateUser(user) {
			try {
				await updateUserApi(user);

				this.$message({
					message: "編輯成功!",
					type: "success"
				});

				this.isUserDialogVisible = false;
				this.fetchUserList();
			} catch (error) {
				console.error(error);
				const message = error.response.data.error_message || "未知錯誤";
				this.$message({ type: "error", message });
			}
		},
		async handleSubmitUserDialog() {
			await this.$validator.validateAll();

			if (this.$validator.errors.items.length > 0) {
				return;
			}

			this.$confirm("是否要確認?", "提示", {
				confirmButtonText: "確認",
				cancelButtonText: "取消",
				type: "warning"
			}).then(async () => {
				if (this.isUpdateMode === false) {
					await this.addUser(this.userForm);
				} else {
					await this.updateUser(this.userForm);
				}
			});
		},
		changeUserPassword() {
			if (this.isUserFormPasswordEnabled === false) {
				this.$refs.passwordInput.blur();
				this.$confirm("是否要修改密碼?", "提示", {
					confirmButtonText: "確認",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.userForm.password = "";
				});
			}
		},
		async setUserEnabled(id, isEnabled) {
			try {
				await setUserEnabledApi(id, isEnabled);

				this.$message({
					message: `${isEnabled === true ? "啟用" : "停用"}用戶成功！`,
					type: "success"
				});
			} catch (error) {
				console.error(error);
				const message = error.response.data.error_message || "未知錯誤";
				this.$message({ type: "error", message });
				this.fetchUserList();
			}
		},
		handleIsEnbaleChange(user) {
			this.$confirm(`是否要${user.isEnabled === true ? "啟用" : "停用"}此用戶?`, "提示", {
				confirmButtonText: "確認",
				cancelButtonText: "取消",
				type: "warning"
			}).then(async () => {
				await this.setUserEnabled(user.id, user.isEnabled);
			});
		}
	},
	computed: {
		isUpdateMode() {
			return this.userForm.id !== 0;
		},
		isUserFormPasswordEnabled() {
			return this.userForm.password !== undefined;
		},
	},
	created() {
		this.fetchUserList();
		this.fetchSelectableRoles();
	}
};
</script>

<style>
.filter-container,
.operation-container {
	margin-bottom: 20px;
}

.filter-header,
.operation {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.filter-title,
.operation-title {
	display: flex;
}

.filter-title i,
.operation-title i {
	margin-right: 6px;
}

.filter-body {
	margin-top: 8px;
	padding-left: 32px;
}

.filter .el-form--inline .el-form-item {
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
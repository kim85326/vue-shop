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
				prop="lastestLoginTime"
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
				width="180"
				align="center"
			>
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="text"
						@click="handleAllocateRole(scope.row)"
					>
						分配角色
					</el-button>
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
					<el-input v-model="userForm.username"></el-input>
				</el-form-item>
				<el-form-item label="姓名：">
					<el-input v-model="userForm.name"></el-input>
				</el-form-item>
				<el-form-item label="信箱：">
					<el-input v-model="userForm.email"></el-input>
				</el-form-item>
				<el-form-item label="密碼：">
					<el-input
						type="password"
						v-model="userForm.password"
					></el-input>
				</el-form-item>
				<el-form-item label="備註：">
					<el-input
						type="textarea"
						v-model="userForm.remark"
						:rows="5"
					></el-input>
				</el-form-item>
				<el-form-item label="是否啟用：">
					<el-radio
						v-model="userForm.isEnabled"
						:label="true"
					>是</el-radio>
					<el-radio
						v-model="userForm.isEnabled"
						:label="false"
					>否</el-radio>
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
		<el-dialog
			title="分配角色"
			:visible.sync="isAllocateRoleDialogVisible"
			class="allocate-role-dialog"
		>
			<el-form
				ref="form"
				:model="allocateRoleForm"
				size="small"
			>
				<el-select
					v-model="allocateRoleForm.roles"
					multiple
					placeholder="請選擇"
				>
					<el-option
						v-for="role in selectableRoles"
						:key="role.id"
						:label="role.name"
						:value="role.id"
					>
					</el-option>
				</el-select>
			</el-form>
			<div
				slot="footer"
				class="dialog-footer"
			>
				<el-button
					size="small"
					@click="isAllocateRoleDialogVisible = false"
				>取 消</el-button>
				<el-button
					size="small"
					type="primary"
					@click="handleSubmitAllocateRoleDialog"
				>確 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import getUserListApi from "../../api/user";
import getPaginationFromHeaders from "../../utils/headers";

const defaultPagination = {
	pageSizes: [2, 5, 10],
	pageSize: 10,
	currentPage: 1,
	total: 0,
};

const defaultUserForm = {
	id: 0,
	username: "",
	name: "",
	email: "",
	password: "",
	remark: "",
	isEnabled: true
};

const defaultAllocateRoleForm = {
	roles: [],
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
			userForm: defaultUserForm,
			isAllocateRoleDialogVisible: false,
			allocateRoleForm: defaultAllocateRoleForm,
			selectableRoles: [
				{
					id: 1,
					name: "超級管理員"
				},
				{
					id: 2,
					name: "商品管理員"
				},
				{
					id: 4,
					name: "訂單管理員"
				}
			],
		};
	},
	methods: {
		async fetchUserList() {
			try {
				this.isUserListLoading = true;

				const params = new URLSearchParams();
				params.append("page", this.pagination.currentPage);
				params.append("pageSize", this.pagination.pageSize);

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
			this.userForm = defaultUserForm;
		},
		handleUpdate(row) {
			this.isUserDialogVisible = true;
			this.userForm = row;
		},
		handleDelete(row) {
			this.$confirm("是否刪除該用戶？", "提示", {
				confirmButtonText: "確定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				// TODO: 刪除用戶
				console.log(row.id);
				this.$message({
					message: "刪除成功!",
					type: "success"
				});
				this.fetchUserList();
			});
		},
		handleSubmitUserDialog() {
			this.$confirm("是否要確認?", "提示", {
				confirmButtonText: "確認",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					if (this.isUpdateMode === false) {
						// TODO: 新增使用者
						this.$message({
							message: "新增成功！",
							type: "success"
						});
						this.isUserDialogVisible = false;
						this.fetchUserList();
					} else {
						// TODO: 更新使用者
						this.$message({
							message: "編輯成功！",
							type: "success"
						});
						this.isUserDialogVisible = false;
						this.fetchUserList();
					}
				});
		},
		handleAllocateRole(row) {
			this.isAllocateRoleDialogVisible = true;
			const roles = this.getRolesByUserId(row.id);
			this.allocateRoleForm.roleIds = roles.map((role) => role.id);
		},
		getRolesByUserId(id) {
			// TODO: 透過使用者編號取得該使用者的角色列表
			console.log(id);
			const roles = [
				{
					id: 1,
					name: "超級管理員"
				}
			];
			return roles;
		},
		handleSubmitAllocateRoleDialog() {
			this.$confirm("是否要確認?", "提示", {
				confirmButtonText: "確認",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				// TODO: 分配角色
				this.$message({
					message: "分配角色成功！",
					type: "success"
				});
				this.isAllocateRoleDialogVisible = false;
			});
		},
		handleIsEnbaleChange(user) {
			const operationText = user.isEnabled === true ? "啟用" : "停用";

			this.$confirm(`是否要${operationText}此用戶?`, "提示", {
				confirmButtonText: "確認",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				// TODO: 啟停用使用者
				this.$message({
					message: `${operationText}成功！`,
					type: "success"
				});
			}).catch(() => {
				this.$message({
					type: "info",
					message: `取消${operationText}`
				});
				this.fetchUserList();
			});;
		}
	},
	computed: {
		isUpdateMode() {
			return this.userForm.id !== 0;
		}
	},
	created() {
		this.fetchUserList();
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

.user-dialog input,
.user-dialog textarea {
	width: 250px;
}

.allocate-role-dialog .el-dialog {
	width: 500px;
}

.allocate-role-dialog .el-select {
	width: 80%;
}
</style>